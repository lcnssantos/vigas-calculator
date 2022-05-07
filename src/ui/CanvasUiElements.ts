import {CANVAS} from "../constants";
import {Arc, ArcDirection} from "../types/arc";
import {Circle} from "../types/circle";
import {Force} from "../types/force";
import {Line} from "../types/line";
import {Load} from "../types/load";
import {Moment} from "../types/moment";
import {Support, SupportType} from "../types/support";
import {Text} from "../types/text";
import {Calc} from "../utils/math";
import {UiElement} from "./uiElement";

export class CanvasUiElements {
    static getScaleValue = (length: number) => {
        const width = CANVAS.WIDTH * 0.9;
        return width / length;
    };

    static getArrowData = (
        position: [number, number],
        length: number,
        angle: number,
        color = "black",
        width = 2
    ): UiElement => {
        const newAngle = -(angle + 90);

        return {
            lines: [
                {
                    firstPoint: position,
                    size: length,
                    angle: newAngle,
                    color,
                    width,
                },
                {
                    firstPoint: position,
                    size: 10,
                    angle: newAngle + 45,
                    color,
                    width,
                },
                {
                    firstPoint: position,
                    size: 10,
                    angle: newAngle - 45,
                    color,
                    width,
                },
            ],
            arcs: [],
            circles: [],
            texts: [],
        };
    };

    static getEquilateralTriangleData = (
        size: number,
        topPosition: [number, number],
        color: string,
        width: number
    ): UiElement => {
        const COS_60 = 0.5;
        const SIN_60 = Math.sqrt(3) / 2;

        return {
            lines: [
                {
                    firstPoint: topPosition,
                    size: size,
                    angle: 60,
                    color,
                    width,
                },
                {
                    firstPoint: topPosition,
                    size: size,
                    angle: 120,
                    color,
                    width,
                },
                {
                    firstPoint: [
                        topPosition[0] - size * COS_60,
                        topPosition[1] + size * SIN_60,
                    ],
                    size: size,
                    angle: 0,
                    color,
                    width,
                },
            ],
            arcs: [],
            circles: [],
            texts: [],
        };
    };

    static getSupportData = (
        support: Support,
        baseLength: number,
        color = "black",
        width = 2
    ): UiElement => {
        const scale = this.getScaleValue(baseLength);
        const LENGTH = CANVAS.HEIGHT / 40;
        const CENTER =
            CANVAS.WIDTH / 2 - (baseLength / 2 - support.position) * scale;

        const getSimpleSupportSymbol = () => {
            const circles: Array<Circle> = [
                {
                    center: [CENTER, CANVAS.HEIGHT / 2 + LENGTH / 2],
                    color,
                    radius: LENGTH / 2,
                    width,
                },
            ];
            return {lines: [], circles};
        };

        const getDoubleSupportSymbol = () => {
            const lines = [
                ...this.getEquilateralTriangleData(
                    LENGTH,
                    [CENTER, CANVAS.HEIGHT / 2],
                    color,
                    width
                ).lines,
            ];

            return {lines, circles: []};
        };

        const getEmbedSupportSymbol = () => {
            const lines: Array<Line> = [
                {
                    firstPoint: [CENTER, CANVAS.HEIGHT / 2 - (LENGTH * 3) / 2],
                    size: LENGTH * 3,
                    angle: 90,
                    color,
                    width: 6,
                },
            ];

            return {lines, circles: []};
        };

        const getSymbol = () => {
            switch (support.type) {
                case SupportType.SIMPLE:
                    return getSimpleSupportSymbol();
                case SupportType.DOUBLE:
                    return getDoubleSupportSymbol();
                case SupportType.EMBED:
                    return getEmbedSupportSymbol();
                default:
                    return getSimpleSupportSymbol();
            }
        };

        const text: Text = {
            position: [CENTER, CANVAS.HEIGHT / 2 + 50],
            color,
            content: support.id,
        };

        return {
            lines: getSymbol().lines,
            texts: [text],
            circles: getSymbol().circles,
            arcs: [],
        };
    };

    static getForceData = (
        force: Force,
        baseLength: number,
        color = "blue"
    ): UiElement => {
        const scale = this.getScaleValue(baseLength);
        const position: [number, number] = [
            CANVAS.WIDTH / 2 - (baseLength / 2 - force.position) * scale,
            CANVAS.HEIGHT / 2,
        ];

        const LENGTH = CANVAS.HEIGHT / 15;

        const {cos, sin} = Calc.getCosSinTan(force.angle);

        const text: Text = {
            content: force.intensity ? `${force.id}=${force.intensity}kN` : force.id,
            position: [
                position[0] - LENGTH * sin - 10,
                position[1] - LENGTH * cos - 10,
            ],
            color,
        };

        const lines: Array<Line> = this.getArrowData(
            position,
            LENGTH,
            force.angle,
            color,
            4
        ).lines;

        return {
            lines,
            texts: [text],
            arcs: [],
            circles: [],
        };
    };

    static getRectangleData = (
        topLeft: [number, number],
        width: number,
        height: number,
        angle = 0
    ): UiElement => {
        const {cos, sin} = Calc.getCosSinTan(angle);

        const lines: Array<Line> = [
            {
                firstPoint: topLeft,
                size: width,
                angle,
            },
            {
                firstPoint: [topLeft[0] + height * sin, topLeft[1] - height * cos],
                size: width,
                angle,
            },
            {
                firstPoint: [topLeft[0] + height * sin, topLeft[1] - height * cos],
                size: height,
                angle: angle + 90,
            },
            {
                firstPoint: [
                    topLeft[0] + width * cos + height * sin,
                    topLeft[1] + width * sin - height * cos,
                ],
                size: height,
                angle: angle + 90,
            },
        ];

        return {
            lines,
            texts: [],
            circles: [],
            arcs: [],
        };
    };

    static getBaseData = (length: number): UiElement => {
        const marginLeft = CANVAS.WIDTH * 0.05;
        const scale = this.getScaleValue(length);

        const line: Line = {
            firstPoint: [marginLeft, CANVAS.HEIGHT / 2],
            size: scale * length,
            angle: 0,
            width: 4,
        };

        return {
            lines: [line],
            arcs: [],
            circles: [],
            texts: [],
        };
    };

    static getLoadData = (
        load: Load,
        baseLength: number,
        maxValue: number
    ): UiElement => {
        const scale = this.getScaleValue(baseLength);
        const CENTER = CANVAS.WIDTH / 2 - (baseLength / 2 - load.initialPosition) * scale;

        const LEGTH = (load.finalPosition - load.initialPosition);
        const DIVISOR = LEGTH * 0.15;
        const QUANTITY = Math.round(
            LEGTH / DIVISOR
        );

        const MAX_LENGTH = CANVAS.HEIGHT / 25;

        const VALUE_INTERVAL = load.finalValue - load.initialValue;
        const POSITION_INTERVAL = Math.abs(
            load.finalPosition - load.initialPosition
        );
        const VERTICAL_SCALE = MAX_LENGTH / maxValue;

        const ANGLE =
            load.finalValue === load.initialValue
                ? 0
                : Calc.radToDeg(
                    Math.atan2(
                        VERTICAL_SCALE * VALUE_INTERVAL,
                        POSITION_INTERVAL * scale
                    )
                );

        const lines: Array<Line> = [
            {
                firstPoint: [
                    CENTER,
                    CANVAS.HEIGHT / 2 - load.initialValue * VERTICAL_SCALE,
                ],
                size:
                    ((load.finalPosition - load.initialPosition) * scale) /
                    Calc.getCosSinTan(ANGLE).cos,
                angle: isNaN(ANGLE) ? 0 : -ANGLE,
            },
            ...new Array(Math.abs(QUANTITY) + 1)
                .fill("a")
                .map(
                    (_, index) =>
                        this.getArrowData(
                            [
                                CENTER + (POSITION_INTERVAL * scale * index) / QUANTITY,
                                CANVAS.HEIGHT / 2,
                            ],
                            Math.abs(
                                (load.initialValue + index * (VALUE_INTERVAL / QUANTITY)) *
                                VERTICAL_SCALE
                            ),
                            (load.initialValue + index * (VALUE_INTERVAL / QUANTITY)) *
                            VERTICAL_SCALE >
                            0
                                ? 0
                                : 180
                        ).lines
                )
                .reduce((out, lines) => [...out, ...lines], []),
        ];
        const texts: Array<Text> = [
            {
                color: "black",
                content: load.finalValue + "kN/m",
                position: [
                    CENTER + load.finalPosition * scale,
                    CANVAS.HEIGHT / 2 - load.finalValue * VERTICAL_SCALE,
                ],
            },
            {
                color: "black",
                content: load.initialValue + "kN/m",
                position: [
                    CENTER,
                    CANVAS.HEIGHT / 2 - 10 - load.initialValue * VERTICAL_SCALE,
                ],
            },
        ];

        return {
            lines,
            texts,
            arcs: [],
            circles: [],
        };
    };

    static getMomentData = (
        moment: Moment,
        baseLength: number,
        color = "brown"
    ): UiElement => {
        const scale = this.getScaleValue(baseLength);
        const CENTER =
            CANVAS.WIDTH / 2 - (baseLength / 2 - moment.position) * scale;
        const RADIUS = 20;

        const MOMENT_NEGATIVE = moment.value && moment.value < 0;

        const START = MOMENT_NEGATIVE ? 130 : 50;
        const END = MOMENT_NEGATIVE ? 230 : 310;

        const arc: Arc = {
            center: [CENTER - RADIUS / 2, CANVAS.HEIGHT / 2],
            color: color,
            startAngle: START,
            endAngle: END,
            radius: RADIUS,
            width: 4,
            direction: MOMENT_NEGATIVE
                ? ArcDirection.COUNTER_CLOCK_WISE
                : ArcDirection.CLOCK_WISE,
        };

        const text: Text = {
            content: moment.value ? `${moment.id}=${moment.value}kNm` : moment.id,
            position: [
                CENTER + (moment.position === 0 ? -RADIUS * 2 : RADIUS * 2),
                CANVAS.HEIGHT / 2 - RADIUS * 1.3,
            ],
            color: color,
        };

        const {cos: COS_START, sin: SIN_START} = Calc.getCosSinTan(START);

        const lines: Array<Line> = [
            {
                firstPoint: [
                    CENTER - RADIUS / 2 + COS_START * RADIUS,
                    CANVAS.HEIGHT / 2 - SIN_START * RADIUS,
                ],
                size: RADIUS / 2,
                angle: MOMENT_NEGATIVE ? 30 : -100,
                color: color,
                width: 4,
            },
            {
                firstPoint: [
                    CENTER - RADIUS / 2 + COS_START * RADIUS,
                    CANVAS.HEIGHT / 2 - SIN_START * RADIUS,
                ],
                size: RADIUS / 2,
                angle: MOMENT_NEGATIVE ? -75 : 145,
                color: color,
                width: 4,
            },
        ];

        return {
            arcs: [arc],
            texts: [text],
            lines,
            circles: [],
        };
    };

    static getMeasurementData = (
        positions: Array<number>,
        baseLength: number
    ): UiElement => {
        const scale = this.getScaleValue(baseLength);

        const lines: Array<Line> = [
            {
                firstPoint: [CANVAS.WIDTH * 0.05, CANVAS.HEIGHT / 2 + 150],
                size: baseLength * scale,
                angle: 0,
                color: "red",
                width: 1,
            },
            {
                firstPoint: [CANVAS.WIDTH * 0.05, CANVAS.HEIGHT / 2 + 150],
                size: 150,
                angle: 270,
                color: "red",
                width: 1,
            },
            {
                firstPoint: [
                    CANVAS.WIDTH * 0.05 + baseLength * scale,
                    CANVAS.HEIGHT / 2 + 150,
                ],
                size: 150,
                angle: 270,
                color: "red",
                width: 1,
            },
            ...positions.map(
                (p): Line => ({
                    firstPoint: [
                        CANVAS.WIDTH * 0.05 + p * scale,
                        CANVAS.HEIGHT / 2 + 150,
                    ],
                    size: 150,
                    angle: 270,
                    color: "red",
                    width: 1,
                })
            ),
        ];

        const texts: Array<Text> = [
            ...positions
                .map(
                    (p, i): Text => ({
                        color: "red",
                        content: `${p - positions[i - 1]}m`,
                        position: [
                            CANVAS.WIDTH * 0.05 + ((p + positions[i - 1]) / 2) * scale,
                            CANVAS.HEIGHT / 2 + 140,
                        ],
                    })
                )
                .filter((t) => t.content !== "0m"),
            {
                color: "red",
                content: `${baseLength}m`,
                position: [
                    CANVAS.WIDTH * 0.05 + (baseLength / 2) * scale,
                    CANVAS.HEIGHT / 2 + 170,
                ],
            },
        ];

        const lastPosition = positions[positions.length - 1];

        if (positions.filter((p) => p !== 0).length > 0) {
            if (lastPosition !== baseLength) {
                texts.push({
                    color: "red",
                    content: `${baseLength - lastPosition}m`,
                    position: [
                        CANVAS.WIDTH * 0.05 + ((baseLength + lastPosition) / 2) * scale,
                        CANVAS.HEIGHT / 2 + 140,
                    ],
                });
            }
        }

        return {
            lines,
            texts: texts.map((t) => {
                t.content = Number(t.content.replace("m", "")).toFixed(2) + "m";
                return t;
            }),
            arcs: [],
            circles: [],
        };
    };
}
