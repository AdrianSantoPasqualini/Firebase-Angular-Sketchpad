import { Component, OnInit } from '@angular/core';

import { fabric } from 'fabric';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.css']
})
export class FabricCanvasComponent implements OnInit {
  canvas: fabric.Canvas;
  color: string;

  constructor() { 
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

  updateStrokeColor(event: any): void {
    this.canvas.freeDrawingBrush.color = event;
  }

}
