import {FC, useEffect} from "react";
import {CANVAS} from "../../constants";
import {CanvasDraw} from "../../ui/CanvasDraw";
import {UiElement} from "../../ui/uiElement";
import {Container} from "react-bootstrap";

interface CanvasProps {
    data: UiElement;
}

export const Canvas: FC<CanvasProps> = ({data}) => {
    const {arcs, circles, lines, texts} = data;

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
        <Container style={{overflowX: 'auto', margin: '0 auto'}}>
            <canvas
                id="canvas"
                width={CANVAS.WIDTH}
                height={CANVAS.HEIGHT}
                style={{
                    height: "100%",
                    minHeight: "500px",
                    width: "100%",
                    minWidth: "700px",
                    maxWidth: "1800px",
                    display: "block",
                }}
            ></canvas>
        </Container>
    );
};
