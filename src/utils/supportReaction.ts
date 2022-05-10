import {Force} from "../types/force";
import {Support, SupportType} from "../types/support";
import {Formula} from "../types/formula";
import {Load} from "../types/load";

export class SupportReaction {
    static getSupportReaction(forces: Array<Force>, supports: Array<Support>, loads: Array<Load>) {
        let [yForceResult, xForceResult] = [0, 0];
        const [ySupports, xSupports] = [new Array<Support>(), new Array<Support>()];

        // Calculando forças resultante nos dois eixos
        loads.forEach((load) => {
            load.resultForces.forEach((force) => {
                xForceResult += force.XComponent || 0;
                yForceResult += force.YComponent || 0;
            });
        });

        forces.forEach((force) => {
            xForceResult += force.XComponent || 0;
            yForceResult += force.YComponent || 0;
        });

        supports.forEach((support) => {
            // verificando se o apoio tem reação no eixo Y
            if ((support.type === SupportType.SIMPLE) || (support.type === SupportType.DOUBLE) || (support.type === SupportType.EMBED)) {
                ySupports.push(support);
            }

            // verificando se o apoio tem reação no eixo X
            if ((support.type === SupportType.DOUBLE) || (support.type === SupportType.EMBED)) {
                xSupports.push(support);
            }
        });

        return this.buildSumFormulas(ySupports, xSupports, xForceResult, yForceResult);
    }

    private static buildSumFormulas(ySupports: Array<Support>, xSupports: Array<Support>, xForceResult: number, yForceResult: number) {
        let xSupportsText: string = '0';
        let ySupportsText: string = '0';

        if (xSupports.length > 0) {
            xSupports.forEach((support) => {
                const id = support.forces[1].id;
                xSupportsText === '0' ? xSupportsText = id : xSupportsText += ` + ${id}`;
            });
        }

        if (ySupports.length > 0) {
            ySupports.forEach((support) => {
                const id = support.forces[0].id;
                ySupportsText === '0' ? ySupportsText = id : ySupportsText += ` + ${id}`;
            });
        }

        const sumXFormula: string = `∑Fx = ${xSupportsText} - ( ${xForceResult} ) = 0`;
        const sumYFormula: string = `∑Fy = ${ySupportsText} - ( ${yForceResult} ) = 0`;

        return new Formula(sumXFormula, sumYFormula, undefined);
    }
}