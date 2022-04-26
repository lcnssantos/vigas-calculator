export class Calc {
  static degToRad = (angle: number) => (angle / 180) * Math.PI;
  static radToDeg = (angle: number) => (angle / Math.PI) * 180;

  static getCosSinTan = (angle: number) => {
    const sin = Math.sin(Calc.degToRad(angle));
    const cos = Math.cos(Calc.degToRad(angle));
    const tan = Math.tan(Calc.degToRad(angle));

    return { sin, cos, tan };
  };
}
