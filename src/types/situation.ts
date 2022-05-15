import { MathCalc } from "../math";
import { Force } from "./force";
import { Load } from "./load";
import { Moment } from "./moment";
import { Support } from "./support";

export class Situation {
  constructor(
    private length: number,
    private supports: Array<Support>,
    private forces: Array<Force>,
    private moments: Array<Moment>,
    private loads: Array<Load>
  ) {}

  getDecodedForces(): {
    x: Array<Force>;
    y: Array<Force>;
    total: Array<Force>;
  } {
    const supportDecodedForces = this.supports
      .map((s) => s.forces)
      .reduce((out, forces) => [...out, ...forces], []);

    const decodedForces = this.forces
      .filter((f) => ![0, 180].includes(f.angle))
      .map((f) => {
        const { fx, fy } = MathCalc.decodeForce(f);
        return [fx, fy];
      })
      .reduce((out, forces) => [...out, ...forces], []);

    const loadForces = this.loads
      .map((l) => l.forces)
      .reduce((out, forces) => [...out, ...forces], []);

    const forces = [...supportDecodedForces, ...decodedForces, ...loadForces];

    return {
      x: forces.filter((f) => [90, 270].includes(f.angle)),
      y: forces.filter((f) => [0, 180].includes(f.angle)),
      total: forces,
    };
  }
}
