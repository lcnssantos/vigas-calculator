import { Calc } from "./utils/math";
import { Force } from "./types/force";

export class MathCalc {
  static decodeForce(force: Force) {
    const { cos, sin } = Calc.getCosSinTan(force.angle);

    const fx: Force = {
      id: force.id + "y",
      angle: cos >= 0 ? 0 : 180,
      intensity: force.intensity
        ? Math.abs(Math.round(force.intensity * cos * 10) / 10)
        : undefined,
      position: force.position,
    };

    const fy: Force = {
      id: force.id + "x",
      angle: sin >= 0 ? 90 : -90,
      intensity: force.intensity
        ? Math.abs(Math.round(force.intensity * sin * 10) / 10)
        : undefined,
      position: force.position,
    };

    return { fx, fy };
  }

  static decodeSingleForce(intensity: number | undefined, angle: number) {
    const {cos, sin} = Calc.getCosSinTan(angle);

    const fx: number = intensity ? Math.abs(Math.round(intensity * sin * 10) / 10) : 0;
    const fy: number = intensity ? Math.abs(Math.round(intensity * cos * 10) / 10) : 0;

    return [fx, fy];
  }
}
