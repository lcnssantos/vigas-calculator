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
}

export class EmbedSupport implements Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.EMBED;
    this.position = position;
  }
}

export class DoubleSupport implements Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.DOUBLE;
    this.position = position;
  }
}

export class SimpleSupport implements Support {
  id: string;
  type: SupportType;
  position: number;
  moment: Moment | undefined;

  constructor(id: string, position: number) {
    this.id = id;
    this.type = SupportType.SIMPLE;
    this.position = position;
  }
}
