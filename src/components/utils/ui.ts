import { CANVAS } from "../../constants";
import { Arc, ArcDirection } from "../../types/arc";
import { Circle } from "../../types/circle";
import { Force } from "../../types/force";
import { Line } from "../../types/line";
import { Load } from "../../types/load";
import { Moment } from "../../types/moment";
import { Support, SupportType } from "../../types/support";
import { Text } from "../../types/text";
import { Calc } from "./math";

export const getScaleValue = (length: number) => {
  const width = CANVAS.WIDTH * 0.9;
  return width / length;
};

export const getArrowData = (
  position: [number, number],
  length: number,
  angle: number,
  color = "black",
  width = 2
): Array<Line> => {
  const newAngle = -(angle + 90);

  return [
    {
      firstPoint: position,
      size: length,
      angle: newAngle,
      color,
      width,
    },
    {
      firstPoint: position,
      size: length / 10,
      angle: newAngle + 45,
      color,
      width,
    },
    {
      firstPoint: position,
      size: length / 10,
      angle: newAngle - 45,
      color,
      width,
    },
  ];
};

export const getEquilateralTriangleData = (
  size: number,
  topPosition: [number, number],
  color: string,
  width: number
): Array<Line> => {
  const COS_60 = 0.5;
  const SIN_60 = Math.sqrt(3) / 2;

  return [
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
  ];
};

export const getSupportData = (
  support: Support,
  baseLength: number,
  color = "black",
  width = 2
) => {
  const scale = getScaleValue(baseLength);
  const LENGTH = CANVAS.HEIGHT / 40;
  const CENTER = CANVAS.WIDTH / 2 - (baseLength / 2 - support.position) * scale;

  const text: Text = {
    position: [CENTER, CANVAS.HEIGHT / 2 + 50],
    color,
    content: support.id,
  };

  const getSimpleSupportSymbol = () => {
    const circles: Array<Circle> = [
      {
        center: [CENTER, CANVAS.HEIGHT / 2 + scale + LENGTH / 2],
        color,
        radius: LENGTH / 2,
        width,
      },
    ];
    return { lines: [], circles };
  };

  const getDoubleSupportSymbol = () => {
    const lines = [
      ...getEquilateralTriangleData(
        LENGTH,
        [CENTER, CANVAS.HEIGHT / 2 + scale],
        color,
        width
      ),
    ];

    return { lines, circles: [] };
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

    return { lines, circles: [] };
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

  return {
    lines: getSymbol().lines,
    text,
    circles: getSymbol().circles,
  };
};

export const getForceData = (
  force: Force,
  baseLength: number,
  color = "blue"
) => {
  const scale = getScaleValue(baseLength);
  const position: [number, number] = [
    CANVAS.WIDTH / 2 - (baseLength / 2 - force.position) * scale,
    CANVAS.HEIGHT / 2,
  ];

  const LENGTH = CANVAS.HEIGHT / 15;

  const { cos, sin } = Calc.getCosSinTan(force.angle);

  const text: Text = {
    content: force.intensity ? `${force.id}=${force.intensity}kN` : force.id,
    position: [
      position[0] - LENGTH * sin - 10,
      position[1] - LENGTH * cos - 10,
    ],
    color,
  };

  const lines: Array<Line> = getArrowData(
    position,
    LENGTH,
    force.angle,
    color,
    4
  );

  return {
    lines,
    text,
  };
};

export const getRectangleData = (
  topLeft: [number, number],
  width: number,
  height: number,
  angle = 0
) => {
  const { cos, sin } = Calc.getCosSinTan(angle);

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
  };
};

export const getBaseData = (length: number, scale: number) => {
  const marginLeft = CANVAS.WIDTH * 0.05;
  const { lines } = getRectangleData(
    [marginLeft, CANVAS.HEIGHT / 2 + scale],
    scale * length,
    scale,
    0
  );
  return lines;
};

export const getLoadData = (load: Load, baseLength: number) => {
  const scale = getScaleValue(baseLength);
  const CENTER =
    CANVAS.WIDTH / 2 - (baseLength / 2 - load.initialPosition) * scale;

  const QUANTITY = Math.round((load.finalPosition - load.initialPosition) / 10);

  const MAX_LENGTH = 50;

  const VALUE_INTERVAL = Math.abs(load.finalValue - load.initialValue);
  const POSITION_INTERVAL = Math.abs(load.finalPosition - load.initialPosition);
  const VERTICAL_SCALE = MAX_LENGTH / load.finalValue;

  const ANGLE = -Calc.radToDeg(
    Math.atan2(VERTICAL_SCALE * VALUE_INTERVAL, POSITION_INTERVAL * scale)
  );

  const lines: Array<Line> = [
    {
      firstPoint: [
        CENTER,
        CANVAS.HEIGHT / 2 - load.initialValue * VERTICAL_SCALE,
      ],
      size:
        ((load.finalPosition - load.initialPosition) * scale) /
        Calc.getCosSinTan(ANGLE + 180).cos,
      angle: ANGLE + 180,
    },
    ...new Array(QUANTITY + 1)
      .fill("a")
      .map((_, index) =>
        getArrowData(
          [
            CENTER + (POSITION_INTERVAL * scale * index) / QUANTITY,
            CANVAS.HEIGHT / 2,
          ],
          (load.initialValue + index * (VALUE_INTERVAL / QUANTITY)) *
            VERTICAL_SCALE,
          0
        )
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
  };
};

export const getMomentData = (moment: Moment, baseLength: number) => {
  const scale = getScaleValue(baseLength);
  const CENTER = CANVAS.WIDTH / 2 - (baseLength / 2 - moment.position) * scale;
  const RADIUS = 20;

  const MOMENT_NEGATIVE = moment.value && moment.value < 0;

  const START = MOMENT_NEGATIVE ? 130 : 50;
  const END = MOMENT_NEGATIVE ? 230 : 310;

  const arc: Arc = {
    center: [CENTER - RADIUS / 2, CANVAS.HEIGHT / 2],
    color: "brown",
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
    position: [CENTER - RADIUS * 2, CANVAS.HEIGHT / 2 - RADIUS * 1.3],
    color: "brown",
  };

  const { cos: COS_START, sin: SIN_START } = Calc.getCosSinTan(START);

  const lines: Array<Line> = [
    {
      firstPoint: [
        CENTER - RADIUS / 2 + COS_START * RADIUS,
        CANVAS.HEIGHT / 2 - SIN_START * RADIUS,
      ],
      size: RADIUS / 2,
      angle: MOMENT_NEGATIVE ? 30 : -100,
      color: "brown",
      width: 4,
    },
    {
      firstPoint: [
        CENTER - RADIUS / 2 + COS_START * RADIUS,
        CANVAS.HEIGHT / 2 - SIN_START * RADIUS,
      ],
      size: RADIUS / 2,
      angle: MOMENT_NEGATIVE ? -75 : 145,
      color: "brown",
      width: 4,
    },
  ];

  return {
    arc,
    text,
    lines,
  };
};
