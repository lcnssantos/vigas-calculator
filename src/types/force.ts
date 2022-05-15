export class Force {
  constructor(
    public id: string,
    public intensity: number | undefined,
    public angle: number,
    public position: number
  ) {}
}
