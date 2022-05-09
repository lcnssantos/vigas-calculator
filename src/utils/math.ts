import { Equation } from "../types/equation";

export class Calc {
  static degToRad = (angle: number) => (angle / 180) * Math.PI;
  static radToDeg = (angle: number) => (angle / Math.PI) * 180;

  static getCosSinTan = (angle: number) => {
    const sin = Math.sin(Calc.degToRad(angle));
    const cos = Math.cos(Calc.degToRad(angle));
    const tan = Math.tan(Calc.degToRad(angle));

    return { sin, cos, tan };
  };

  /** Esse metódo calcula o determinante de uma madriz quadrada 2x2  */
  /**
   * | a b |
   * | c d |
   *
   * | 1 2 |
   * | 2 3 |
   *
   * Ex.: Calc.determinant([[1, 2], [2, 3]])
   *
   */
  static determinant = ([[a, b], [c, d]]: [
    [number, number],
    [number, number]
  ]) => {
    return a * d - c * b;
  };
}

/**
 * Essa classe resolve um sistema linear de duas icognitas. Para tal exige que seja passada suas equações da forma ax + by = c
 */
export class DoubleLinearSystem {
  constructor(private eq1: Equation, private eq2: Equation) {}

  /**
   * O método solve deve retornar os valores de x e y
   * A implementação abaixo usa o metódo de crammer
   * https://www.todamateria.com.br/regra-cramer/#:~:text=A%20regra%20de%20Cramer%20%C3%A9,um%20n%C3%BAmero%20arbitr%C3%A1rio%20de%20inc%C3%B3gnitas.
   */
  solve() {
    const M = Calc.determinant([
      [this.eq1.a, this.eq1.b],
      [this.eq2.a, this.eq2.b],
    ]);

    const MX = Calc.determinant([
      [this.eq1.c, this.eq1.b],
      [this.eq2.c, this.eq2.b],
    ]);

    const MY = Calc.determinant([
      [this.eq1.a, this.eq1.c],
      [this.eq2.a, this.eq2.c],
    ]);

    return {
      x: MX / M,
      y: MY / M,
    };
  }
}
