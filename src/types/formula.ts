export class Formula {
    MomentSum: string | undefined;
    XSum: string;
    YSum: string;

    constructor(xSum: string, ySum: string, momentSum: string | undefined) {
        this.XSum = xSum;
        this.YSum = ySum;
        this.MomentSum = momentSum;
    }

}