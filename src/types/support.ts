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
  forces: Array<Force>;
  position: number;
  moment: Moment | undefined;
}

export class EmbedSupport implements Support {
  id: string;
  type: SupportType;
  forces: Force[];
  position: number;
  moment: Moment | undefined;

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.EMBED;
    this.position = position;
    this.forces = [
      {
        id: this.id + "y",
        angle: 180,
        position: position,
        intensity: undefined,
      },
      {
        id: this.id + "x",
        angle: 90,
        position: position,
        intensity: undefined,
      },
    ];
    this.moment = {
      value: 0,
      id: "M" + id,
      position: position,
    };
  }
}

export class DoubleSupport implements Support {
  id: string;
  type: SupportType;
  forces: Force[];
  position: number;
  moment: Moment | undefined;

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.DOUBLE;
    this.position = position;
    this.forces = [
      {
        id: this.id + "y",
        angle: 180,
        position: position,
        intensity: undefined,
      },
      {
        id: this.id + "x",
        angle: 90,
        position: position,
        intensity: undefined,
      },
    ];
  }
}

export class SimpleSupport implements Support {
  id: string;
  type: SupportType;
  forces: Force[];
  position: number;
  moment: Moment | undefined;

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.SIMPLE;
    this.position = position;
    this.forces = [
      {
        id: this.id + "y",
        angle: 180,
        position: position,
        intensity: undefined,
      },
    ];
  }
}
