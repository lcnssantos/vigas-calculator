import { Moment } from "./moment";

export class Force {
  id: string;
  intensity: number | undefined;
  angle: number;
  position: number;
  moment: Moment | undefined;

  constructor(
    id: string,
    intensity: number | undefined,
    angle: number,
    position: number
  ) {
    this.id = id;
    this.intensity = intensity;
    this.angle = angle;
    this.position = position;

    if (position > 0) {
      this.moment = {
        id: "M" + this.id,
        position: position,
        value: this.intensity
          ? Math.round(this.intensity * position * 10) / 10
          : undefined,
      };
    }
  }
}
