import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { fabric } from 'fabric';
import { User } from '../services/user.model';

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.css']
})
export class FabricCanvasComponent implements OnInit {
  canvas: fabric.Canvas;
  color: string;
  synching: boolean;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    // Initialize canvas
    this.canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
    });
    this.color = "red";
    this.synching  = false;
  }

  ngOnInit(): void {
    // Create fabric canvas
    this.canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
    });
    this.canvas.freeDrawingBrush.color = this.color;

    // Pull last saved canvas for user
    const currUser = firebase.auth().currentUser;
    if (!currUser) {
      return;
    }
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${currUser.uid}`);
    userRef.ref.get().then(user => {
      const userDoc = user.data();
      if (userDoc) {
        this.canvas.loadFromJSON(userDoc.canvasJSON, () => {
          this.canvas.renderAll();
        });
      }
    });
  }

  clearCanvas() {
    this.canvas.clear();
    this.synchCanvas();
  }

  synchCanvas() {
    // Buffer cavnas synchs to minimize FireStore update spam
    if (!this.synching) {
      setTimeout(() => {
        // Sync the canvas json to the current user in FireStore
        this.synching = true;
        const currUser = firebase.auth().currentUser;
        const uid = currUser ? currUser.uid : null;
        if (!uid) {
          return;
        }
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
        const data = {
          canvasJSON: JSON.stringify(this.canvas.toJSON()),
        }
        userRef.update(data)
        this.synching = false;
      }, 100);
    }
  }

  updateStrokeColor(event: any): void {
    this.canvas.freeDrawingBrush.color = event;
  }
}
