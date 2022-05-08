import { Moment } from "./moment";
import {MathCalc} from "../math";

export class Force {
  id: string;
  intensity: number | undefined;
  XComponent: number | undefined;
  YComponent: number | undefined;
  angle: number;
  position: number;
  moment: Moment | undefined;

  constructor(
    id: string,
    intensity: number | undefined,
    angle: number,
    position: number
  ) {
    this.id = id;
    this.intensity = intensity;
    this.angle = angle;
    this.position = position;
    [this.XComponent, this.YComponent] = MathCalc.decodeSingleForce(intensity, angle);
  }
}
