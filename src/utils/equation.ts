import { Equation } from "../types/equation";
import { Force } from "../types/force";

export class EquationUtil {
  static getHorizontal(forces: Array<Force>): {
    equation: Equation;
    latex: string;
  } {
    //obtem as icognitas (intensity === undefined)
    const unknow = forces.filter((f) => f.intensity === undefined);
    const know = forces
      .filter((f) => f.intensity !== undefined)
      .reduce((out, force): number => {
        if (force.angle === 90) {
          // deveria ser positivo, mas como se encontra do outro lado da equação, vira negativo
          return out - (force.intensity || 0);
        } else {
          // deveria ser negativo, mas como vamos mandar pro outro lado da equação, fica positivo
          return out + (force.intensity || 0);
        }
      }, 0);

    console.log({
      unknow,
      know,
    });

    return {
      equation: {
        a: unknow[0] ? 1 : 0,
        b: unknow[1] ? 1 : 0,
        c: know,
      },
      latex: `$\\sum F_X \\Rightarrow ${unknow
        .map((f) => (f.angle === 90 ? f.id : "-" + f.id))
        .map((id) => id.split("").join("_"))
        .join(" + ")} = ${know}$`,
    };
  }

  static getVertical(forces: Array<Force>): {
    equation: Equation;
    latex: string;
  } {
    //obtem as icognitas (intensity === undefined)
    const unknow = forces.filter((f) => f.intensity === undefined);
    const know = forces
      .filter((f) => f.intensity !== undefined)
      .reduce((out, force): number => {
        if (force.angle === 180) {
          // deveria ser positivo, mas como se encontra do outro lado da equação, vira negativo
          return out - (force.intensity || 0);
        } else {
          // deveria ser negativo, mas como vamos mandar pro outro lado da equação, fica positivo
          return out + (force.intensity || 0);
        }
      }, 0);

    console.log({
      unknow,
      know,
    });

    return {
      equation: {
        a: unknow[0] ? 1 : 0,
        b: unknow[1] ? 1 : 0,
        c: know,
      },
      latex: `$\\sum F_Y \\Rightarrow ${unknow
        .map((f) => (f.angle === 180 ? f.id : "-" + f.id))
        .map((id) => id.split("").join("_"))
        .join(" + ")} = ${know}$`,
    };
  }
}
