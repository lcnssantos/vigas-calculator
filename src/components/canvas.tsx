import { FC, useEffect } from "react";
import { CANVAS } from "../constants";
import { CanvasDraw } from "../ui/CanvasDraw";
import { UiElement } from "../ui/uiElement";

interface CanvasProps {
  data: UiElement;
}

export const Canvas: FC<CanvasProps> = ({ data }) => {
  const { arcs, circles, lines, texts } = data;

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
        height: "100%",
        minHeight: "500px",
        width: "100%",
        minWidth: "700px",
        display: "block",
      }}
    ></canvas>
  );
};
