import { s32 } from '../uuid/uuid';
import { Point } from './point';
import { Rect } from './rect';
import { pointInRect } from '../utils';

export abstract class Pen {
  id = '';
  name = '';
  tags: string[] = [];
  rect: Rect = new Rect(0, 0, 0, 0);
  lineWidth = 1;
  rotate = 0;
  offsetRotate = 0;
  globalAlpha = 1;

  dash = 0;
  lineDash: number[];
  strokeStyle = '';
  fillStyle = '';
  lineCap: string;
  font = {
    color: '',
    fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
    fontSize: 12,
    lineHeight: 1.5,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    textBaseline: 'middle'
  };

  // Date.getTime
  animateStart = 0;
  // Cycle count. Infinite if <= 0.
  animateCycle: number;
  animateCycleIndex = 0;
  nextAnimate: string;
  animatePlay: boolean;

  locked = false;

  // User data.
  data: any;

  active: boolean;
  constructor(json?: any) {
    if (json) {
      this.id = json.id || s32();
      this.name = json.name || '';
      this.tags = json.tags || [];
      if (json.rect) {
        this.rect = new Rect(json.rect.x, json.rect.y, json.rect.width, json.rect.height);
      }
      this.dash = json.dash || 0;
      this.lineDash = json.lineDash;
      this.lineWidth = json.lineWidth || 1;
      this.strokeStyle = json.strokeStyle || '';
      this.fillStyle = json.fillStyle || '';
      this.lineCap = json.lineCap;
      this.globalAlpha = json.globalAlpha || 1;
      this.rotate = json.rotate || 0;
      this.offsetRotate = json.offsetRotate || 0;
      if (json.font) {
        Object.assign(this.font, json.font);
      }
      this.animateCycle = json.animateCycle;
      this.nextAnimate = json.nextAnimate;
      this.animatePlay = json.animatePlay;
      this.data = json.data || '';
      this.locked = json.locked;
    } else {
      this.id = s32();
    }
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.save();

    if (this.rotate || this.offsetRotate) {
      ctx.translate(this.rect.center.x, this.rect.center.y);
      ctx.rotate(((this.rotate + this.offsetRotate) * Math.PI) / 180);
      ctx.translate(-this.rect.center.x, -this.rect.center.y);
    }

    if (this.lineWidth > 1) {
      ctx.lineWidth = this.lineWidth;
    }

    if (this.strokeStyle) {
      ctx.strokeStyle = this.strokeStyle;
    } else {
      ctx.strokeStyle = '#333';
    }

    if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
    } else {
      ctx.fillStyle = 'transparent';
    }

    if (this.lineCap) {
      ctx.lineCap = this.lineCap as CanvasLineCap;
    }

    if (this.globalAlpha < 1) {
      ctx.globalAlpha = this.globalAlpha;
    }

    switch (this.dash) {
      case 1:
        ctx.setLineDash([5, 5]);
        break;
      case 2:
        ctx.setLineDash([10, 10]);
        break;
      case 3:
        ctx.setLineDash([10, 10, 2, 10]);
        break;
    }

    if (this.lineDash) {
      ctx.setLineDash(this.lineDash);
    }

    this.draw(ctx);

    ctx.restore();

    if ((this as any).children) {
      for (const item of (this as any).children) {
        item.render(ctx);
      }
    }
  }

  hit(point: Point, padding = 0) {
    if (!this.rotate) {
      return this.rect.hit(point, padding);
    }

    const pts = this.rect.toPoints();
    for (const pt of pts) {
      pt.rotate(this.rotate, this.rect.center);
    }
    return pointInRect(point, pts);
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
