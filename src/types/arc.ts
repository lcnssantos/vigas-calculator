export enum ArcDirection {
  CLOCK_WISE,
  COUNTER_CLOCK_WISE,
}

export interface Arc {
  radius: number;
  center: [number, number];
  color: string;
  width: number;
  startAngle: number;
  endAngle: number;
  direction: ArcDirection;
}
