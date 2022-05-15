import { Force } from "./force";

export interface Moment {
  value: number | undefined;
  position: number;
  id: string;
  originForce?: Force;
}
