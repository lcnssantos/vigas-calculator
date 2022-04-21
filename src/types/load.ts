import { Force } from "./force";

export class Load {
  id: string;
  initialValue: number;
  finalValue: number;
  initialPosition: number;
  finalPosition: number;

  resultForces: Array<Force>;

  constructor(
    id: string,
    initialValue: number,
    finalValue: number,
    initialPosition: number,
    finalPosition: number
  ) {
    this.id = id;
    this.initialPosition = initialPosition;
    this.finalValue = finalValue;
    this.finalPosition = finalPosition;
    this.initialValue = initialValue;
    this.resultForces = [];
    let count = 0;

    if (initialValue > 0) {
      this.resultForces.push({
        angle: 0,
        id: this.id + count.toString(),
        intensity: ((finalPosition - initialPosition) / 100) * initialValue,
        position: (finalPosition - initialPosition) / 2,
      });
    }

    if (initialValue !== finalValue) {
      count++;
      this.resultForces.push({
        angle: 0,
        id: this.id + count.toString(),
        intensity:
          (((finalPosition - initialPosition) / 100) *
            (finalValue - initialValue)) /
          2,
        position: ((finalPosition - initialPosition) * 2) / 3,
      });
    }
  }
}
