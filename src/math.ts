import { Force } from "./types/force";
import { Calc } from "./utils/math";

export class MathCalc {
  static decodeForce(force: Force) {
    const { cos, sin } = Calc.getCosSinTan(force.angle);

    const fx = new Force(
      force.id + "y",
      force.intensity
        ? Math.abs(Math.round(force.intensity * cos * 10) / 10)
        : undefined,
      cos >= 0 ? 0 : 180,
      force.position
    );

    const fy = new Force(
      force.id + "x",
      force.intensity
        ? Math.abs(Math.round(force.intensity * sin * 10) / 10)
        : undefined,
      sin >= 0 ? 90 : -90,
      force.position
    );

    return { fx, fy };
  }
}
