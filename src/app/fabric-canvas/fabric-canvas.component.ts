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

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
    });
    this.color = "red";
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
    });
    this.canvas.freeDrawingBrush.color = this.color;
  }

  synchCanvas() {
    const currUser = firebase.auth().currentUser;
    const uid = currUser ? currUser.uid : null;
    if (!uid) {
      return;
    }
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data = {
      canvasJSON: JSON.stringify(this.canvas.toJSON()),
    }
    return userRef.update(data)
  }

  updateStrokeColor(event: any): void {
    this.canvas.freeDrawingBrush.color = event;
  }

}
