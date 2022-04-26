import { Line } from "../types/line";
import { Circle } from "../types/circle";
import { Arc } from "../types/arc";
import { Text } from "../types/text";

export interface UiElement {
  lines: Array<Line>;
  circles: Array<Circle>;
  arcs: Array<Arc>;
  texts: Array<Text>;
}
