import { Equation } from "../types/equation";
import { Force } from "../types/force";
import { Moment } from "../types/moment";
import { Calc } from "./math";

export class EquationUtil {
  static getHorizontal(forces: Array<Force>): {
    equation: Equation;
    latex: string;
    unknow: Array<Force>;
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

    return {
      unknow,
      equation: {
        a: unknow[0] ? 1 : 0,
        b: unknow[1] ? 1 : 0,
        c: know,
      },
      latex: `$\\sum F_X = 0\\Rightarrow ${unknow
        .map((f) => (f.angle === 90 ? f.id : "-" + f.id))
        .map((id) => id.split("").join("_"))
        .join(" + ")} = ${know}$`,
    };
  }

  static getVertical(forces: Array<Force>): {
    equation: Equation;
    latex: string;
    unknow: Array<Force>;
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

    return {
      unknow,
      equation: {
        a: unknow[0] ? 1 : 0,
        b: unknow[1] ? 1 : 0,
        c: know,
      },
      latex: `$\\sum F_Y = 0 \\Rightarrow ${unknow
        .map((f) => (f.angle === 180 ? f.id : "-" + f.id))
        .map((id) => id.split("").join("_"))
        .join(" + ")} = ${know}$`,
    };
  }

  static getMoments(moments: Array<Moment>): {
    equation: Equation;
    latex: string;
    unknow: Array<Moment>;
  } {
    //obtem as icognitas (value === undefined)
    const unknow = moments.filter((f) => f.value === undefined);

    // precisa inverter os sinais, dado que a equação é unknow = know
    const know = moments
      .filter((m) => m.value !== undefined)
      .reduce((out, moment): number => {
        return -(moment.value || 0) + out;
      }, 0);

    return {
      unknow,
      equation: {
        a: unknow[0]
          ? (unknow[0].originForce ? unknow[0].originForce.position : 1) *
            -Calc.getCosSinTan(unknow[0].originForce?.angle || 0).cos
          : 0,
        b: unknow[1]
          ? (unknow[1].originForce ? unknow[1].originForce.position : 1) *
            -Calc.getCosSinTan(unknow[1].originForce?.angle || 0).cos
          : 0,
        c: know,
      },
      latex: `$\\sum M = 0 \\Rightarrow ${unknow
        .map((m) =>
          m.originForce?.angle === 0
            ? m.originForce.id
            : -Calc.getCosSinTan(m.originForce?.angle || 0).cos *
                (m.originForce ? m.originForce.position : 1) +
              (m.originForce?.id || m.id)
        )
        .map(
          (id) =>
            id.split("")[0] +
            id.split("")[1] +
            "_{" +
            id.split("").slice(2).join("") +
            "}"
        )
        .join(" + ")} = ${know.toFixed(2)}$`,
    };
  }
}
