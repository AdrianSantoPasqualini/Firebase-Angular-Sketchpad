import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router
  ) {
    // Load user from authState
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );  
  }

  async googleSignin() {
    // Popup Google login window
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({uid, email, displayName, photoURL }: any) {
    // Store user login info in FireStore
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data = { 
      uid,
      email, 
      displayName, 
      photoURL
    }
    return userRef.set(data, { merge: true })
  }

  async signOut() {
    // Sign out user
    await this.afAuth.signOut();
  }
}
