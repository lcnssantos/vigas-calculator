import { Force } from "./force";

export class Load {
  id: string;
  initialValue: number;
  finalValue: number;
  initialPosition: number;
  finalPosition: number;
  private size: number;
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
    this.size = Math.abs(this.finalPosition - this.initialPosition);

    if (this.finalValue === this.initialValue) {
      const force = new Force(
        this.id,
        this.finalValue * this.size,
        0,
        (this.finalPosition + this.initialPosition) / 2
      );
      this.resultForces.push(force);
    } else {
      if (this.initialValue > 0) {
        const force = new Force(
          this.id + "1",
          Math.min(this.initialValue, this.finalValue) * this.size,
          0,
          (this.finalPosition + this.initialPosition) / 2
        );

        this.resultForces.push(force);
      }

      const force = new Force(
        this.id + (this.resultForces.length + 1).toString(),
        Math.abs(this.finalValue - this.initialValue) * this.size,
        0,
        this.initialPosition +
          this.size * (this.finalValue > this.initialValue ? 2 / 3 : 1 / 3)
      );

      this.resultForces.push(force);
    }
  }
}
