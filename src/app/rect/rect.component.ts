import { Component, ElementRef, OnInit, Input, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import {
  Application,
  Container,
  SCALE_MODES,
  Sprite,
  Text,
  Texture,
  extras,
} from 'pixi.js/dist/pixi.js';

import { PixiService } from '../pixi.service';

@Component({
  selector: 'app-rect',
  templateUrl: './rect.component.html',
  styleUrls: ['./rect.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RectComponent implements OnInit, DoCheck {

  @Input() data = [];
  app: Application;
  rects = [];
  columnPerRow = 100;
  size = 20;
  isAssetLoaded = false;

  constructor(private el: ElementRef, private pixiService: PixiService) {
    this.app = new Application(
      this.size * this.columnPerRow + 1,
      this.size * this.columnPerRow + 1,
      {
        forceCanvas: false,
        antialias: true,
      });
  }

  ngOnInit(): void {
    this.pixiService.loaded$.subscribe(() => this.onAssetsLoaded());
    this.el.nativeElement.appendChild(this.app.view);

  }
  onAssetsLoaded() {
    this.isAssetLoaded = true;
    this.createSprites();
    // this.app.ticker.add((t) => {
    //   console.log(this.app.ticker.FPS);
    //   this.app.stage.children.forEach((container: Container, i) => {
    //     if (container.children[0]) {
    //       container.children[1].text = (Math.random() * 10).toFixed(1);
    //       container.children[0].tint = this.randomColor();
    //     }
    //   });
    // });
  }

  ngDoCheck(): void {
    this.app.stage.children.forEach((container: Container, i) => {
      if (container.children.length > 0) {
        (container.children[0] as Sprite).tint = this.data[i].color;
        (container.children[1] as extras.BitmapText).text = this.data[i].data;
      }
    });
  }

  createSprites() {
    for (let idx = 0; idx < this.data.length; idx++) {
      const d = this.data[idx];
      const texture = this.createTexture();
      const sprite = this.createSprite(texture, this.data[idx]);
      sprite.x = sprite.x + this.size * (idx % this.columnPerRow);
      sprite.y = sprite.y + this.size * Math.floor(idx / this.columnPerRow);
      this.app.stage.addChild(sprite);
    }
  }

  createTexture() {
    const rectangle = this.pixiService.getRect(this.size, 0xFFFFFF);
    return this.toTexture(rectangle);
  }

  toTexture(container) {
    const texture: Texture = this.app.renderer.generateTexture(container, SCALE_MODES.NEAREST);
    return texture;
  }

  createSprite(texture, data) {
    const container = new Container();
    const sprite = new Sprite(texture);
    // const text = new Text(data.data);
    const text = new extras.BitmapText(data.data, { font: '16px Arial', align: 'right' });
    container.addChild(sprite);
    container.addChild(text);
    this.rects.push(container);
    return container;
  }
}
