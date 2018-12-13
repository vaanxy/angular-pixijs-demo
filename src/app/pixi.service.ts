import { Injectable } from '@angular/core';
import { autoDetectRenderer, Graphics, loader } from 'pixi.js/dist/pixi.js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixiService {
  // private renderer = autoDetectRenderer();
  graphics = new Graphics(true);
  private loadedSubject = new Subject<void>();
  loaded$ = this.loadedSubject.asObservable();
  constructor() {
    loader
    .add('Arial', '/assets/text-ipadhd.xml')
    .load(() => this.loadedSubject.next());
  }

  getRect(size, color) {
    this.graphics.clear();
    this.graphics.lineStyle(1, 0x000000, 1);
    this.graphics.beginFill(color);
    this.graphics.drawRect(0, 0, size, size);
    this.graphics.endFill();
    return this.graphics;
  }



  // getRenderer() {
  //   return this.renderer;
  // }
}
