import { Force } from "./force";

export class Load {
  id: string;
  initialValue: number;
  finalValue: number;
  initialPosition: number;
  finalPosition: number;
  private size: number;
  forces: Array<Force>;

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
    this.forces = [];
    this.size = Math.abs(this.finalPosition - this.initialPosition);

    if (this.finalValue === this.initialValue) {
      const force = new Force(
        this.id,
        Math.abs(this.finalValue) * this.size,
        this.finalValue > 0 ? 0 : 180,
        (this.finalPosition + this.initialPosition) / 2
      );
      this.forces.push(force);
    } else {
      if (Math.abs(this.initialValue) > 0) {
        const force = new Force(
          this.id + "1",
          Math.min(this.initialValue, this.finalValue) * this.size,
          0,
          (this.finalPosition + this.initialPosition) / 2
        );

        this.forces.push(force);
      }

      const force = new Force(
        this.id + (this.forces.length + 1).toString(),
        (Math.abs(this.finalValue - this.initialValue) * this.size) / 2,
        this.finalValue - this.initialValue > 0 ? 0 : 180,
        this.initialPosition +
          this.size * (this.finalValue > this.initialValue ? 2 / 3 : 1 / 3)
      );

      this.forces.push(force);
    }
  }
}
