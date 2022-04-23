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
      this.resultForces.push(
        new Force(
          this.id + count.toString(),
          ((finalPosition - initialPosition) / 100) * initialValue,
          0,
          (finalPosition - initialPosition) / 2 + initialPosition
        )
      );
    }

    if (initialValue !== finalValue) {
      count++;
      this.resultForces.push(
        new Force(
          this.id + count.toString(),
          (((finalPosition - initialPosition) / 100) *
            (finalValue - initialValue)) /
            2,
          0,
          ((finalPosition - initialPosition) * 2) / 3 + initialPosition
        )
      );
    }
  }
}
