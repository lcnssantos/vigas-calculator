import { Arc, ArcDirection } from "../types/arc";
import { Circle } from "../types/circle";
import { Line } from "../types/line";
import { Text } from "../types/text";
import { Calc } from "../utils/math";

export class CanvasDraw {
  static drawText = (
    context: CanvasRenderingContext2D,
    { content, position, color }: Text
  ) => {
    context.font = "16px Arial";
    context.fillStyle = color;
    context.fillText(content, position[0] - content.length * 4, position[1]);
  };

  static drawLine = (
    context: CanvasRenderingContext2D,
    { firstPoint, size, angle = 0, color = "black", width = 2 }: Line
  ) => {
    const { cos, sin } = Calc.getCosSinTan(angle);

    const finalPoint = [firstPoint[0] + size * cos, firstPoint[1] + size * sin];

    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(firstPoint[0], firstPoint[1]);
    context.lineTo(finalPoint[0], finalPoint[1]);
    context.lineWidth = width;
    context.stroke();
  };

  static drawCircle = (
    context: CanvasRenderingContext2D,
    { center, radius, color, width }: Circle
  ) => {
    context.beginPath();
    context.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  };

  static drawArc = (
    context: CanvasRenderingContext2D,
    { center, radius, color, width, endAngle, startAngle, direction }: Arc
  ) => {
    context.beginPath();
    context.arc(
      center[0],
      center[1],
      radius,
      Calc.degToRad(startAngle),
      Calc.degToRad(endAngle),
      direction === ArcDirection.COUNTER_CLOCK_WISE
    );
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  };
}
