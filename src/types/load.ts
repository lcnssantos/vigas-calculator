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
  }
}
