import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgParticlesModule } from "ng-particles";
import { ColorPickerModule } from 'ngx-color-picker';

import { FabricCanvasComponent } from './fabric-canvas/fabric-canvas.component';
import { ParticlesComponent } from './particles/particles.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB0RkPvDtmIRFtBJXBw0l4FlSssOIyvOUw",
      authDomain: "fir-angular-sketchpad.firebaseapp.com",
      projectId: "fir-angular-sketchpad",
      storageBucket: "fir-angular-sketchpad.appspot.com",
      messagingSenderId: "362288336042",
      appId: "1:362288336042:web:d3be6bb9938829079154d3",
      measurementId: "G-5Q1KCKXQZX"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgParticlesModule,
    ColorPickerModule,
  ],
  declarations: [AppComponent, FabricCanvasComponent, ParticlesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}