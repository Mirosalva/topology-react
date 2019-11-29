import { Point } from '../../models/point';
import { Rect } from '../../models/rect';

export function diamondSolid(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  scale?: number,
  fillStyle?: string
) {
  const rect = new Rect(to.x - 16, to.y - 4, 14, 8);
  if (scale && scale !== 1) {
    rect.scale(scale, new Point(rect.x + 14, rect.y + 4));
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  ctx.translate(-to.x, -to.y);
  ctx.moveTo(rect.x + rect.width / 2, rect.y);
  ctx.lineTo(rect.x + rect.width, rect.y + rect.height / 2);
  ctx.lineTo(rect.x + rect.width / 2, rect.y + rect.height);
  ctx.lineTo(rect.x, rect.y + rect.height / 2);
  ctx.closePath();
  ctx.lineWidth = 2;
  ctx.stroke();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function diamond(ctx: CanvasRenderingContext2D, from: Point, to: Point, scale?: number) {
  diamondSolid(ctx, from, to, scale, '#fff');
}
