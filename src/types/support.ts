import { Force } from "./force";
import { Moment } from "./moment";

export enum SupportType {
  SIMPLE = "simple",
  DOUBLE = "double",
  EMBED = "embed",
}

export interface Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;
  forces: Array<Force>;
}

export class EmbedSupport implements Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;
  forces: Force[];

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.EMBED;
    this.position = position;
    this.forces = [
      new Force(this.id + "y", undefined, 180, this.position),
      new Force(this.id + "x", undefined, 90, this.position),
    ];
    this.moment = {
      id: "M" + this.id,
      position: this.position,
      value: undefined,
    };
  }
}

export class DoubleSupport implements Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;
  forces: Force[];

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.DOUBLE;
    this.position = position;
    this.forces = [
      new Force(this.id + "y", undefined, 180, this.position),
      new Force(this.id + "x", undefined, 90, this.position),
    ];
    this.moment = undefined;
  }
}

export class SimpleSupport implements Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;
  forces: Force[];

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.SIMPLE;
    this.position = position;
    this.forces = [new Force(this.id + "y", undefined, 180, this.position)];
    this.moment = undefined;
  }
}
