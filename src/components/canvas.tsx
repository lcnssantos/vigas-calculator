import { FC, useEffect } from "react";
import { CANVAS } from "../constants";
import { Arc } from "../types/arc";
import { Circle } from "../types/circle";
import { Line } from "../types/line";
import { Text } from "../types/text";
import { CanvasDraw } from "../ui/CanvasDraw";

interface CanvasProps {
  lines: Array<Line>;
  texts: Array<Text>;
  circles: Array<Circle>;
  arcs: Array<Arc>;
}

export const Canvas: FC<CanvasProps> = ({ lines, texts, circles, arcs }) => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (const line of lines) {
        CanvasDraw.drawLine(context, line);
      }

      for (const text of texts) {
        CanvasDraw.drawText(context, text);
      }

      for (const circle of circles) {
        CanvasDraw.drawCircle(context, circle);
      }

      for (const arc of arcs) {
        CanvasDraw.drawArc(context, arc);
      }
    }
  }, [lines]);

  return (
    <canvas
      id="canvas"
      width={CANVAS.WIDTH}
      height={CANVAS.HEIGHT}
      style={{
        width: "100%",
      }}
    ></canvas>
  );
};
