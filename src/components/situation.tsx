import { useContext, useEffect, useState } from "react";
import { SituationContext } from "../context/situation.context";
import { Arc } from "../types/arc";
import { Circle } from "../types/circle";
import { Force } from "../types/force";
import { Line } from "../types/line";
import { Moment } from "../types/moment";
import { Text } from "../types/text";
import { Canvas } from "./canvas";
import { CanvasUiElements } from "../ui/CanvasUiElements";
import { UiElement } from "../ui/uiElement";

export const Situation = () => {
  const { forces, length, decodedForces, supports, moments, loads, positions } =
    useContext(SituationContext);

  const [lines, setLines] = useState<Array<Line>>([]);
  const [texts, setTexts] = useState<Array<Text>>([]);
  const [circles, setCircles] = useState<Array<Circle>>([]);
  const [arcs, setArcs] = useState<Array<Arc>>([]);

  const concateUiElements = (data: Array<UiElement>) =>
    data.reduce(
      (out, uiElement) => ({
        lines: [...out.lines, ...uiElement.lines],
        texts: [...out.texts, ...uiElement.texts],
        circles: [...out.circles, ...uiElement.circles],
        arcs: [...out.arcs, ...uiElement.arcs],
      }),
      {
        lines: [],
        arcs: [],
        circles: [],
        texts: [],
      }
    );

  const processForces = (forces: Array<Force>, color = "black") => {
    return concateUiElements(
      forces.map((force) => CanvasUiElements.getForceData(force, length, color))
    );
  };

  const processMoments = (moments: Array<Moment>, color = "black") => {
    return concateUiElements(
      moments.map((m) => CanvasUiElements.getMomentData(m, length))
    );
  };

  const processBase = () => {
    return CanvasUiElements.getBaseData(
      length,
      CanvasUiElements.getScaleValue(length)
    );
  };

  const processSupports = () => {
    return concateUiElements(
      supports.map((support) =>
        CanvasUiElements.getSupportData(support, length, "purple")
      )
    );
  };

  const processLoads = () => {
    const absoluteValues = loads
      .map((l) => [Math.abs(l.finalValue), Math.abs(l.initialValue)])
      .reduce((out, values) => [...out, ...values], []);

    const maxValue = Math.max(...absoluteValues);

    return concateUiElements(
      loads.map((load) => CanvasUiElements.getLoadData(load, length, maxValue))
    );
  };

  const processPositions = (positions: Array<number>) => {
    return CanvasUiElements.getMeasurementData(positions, length);
  };

  useEffect(() => {
    const baseUi = processBase();
    const decodedforcesUi = processForces(decodedForces, "green");
    const supportsUi = processSupports();
    const momentsUi = processMoments(moments);
    const loadsUi = processLoads();
    const positionsUi = processPositions(positions);

    const concatenatedUi = concateUiElements([
      baseUi,
      decodedforcesUi,
      supportsUi,
      momentsUi,
      loadsUi,
      positionsUi,
    ]);

    setLines(concatenatedUi.lines);
    setTexts(concatenatedUi.texts);
    setCircles(concatenatedUi.circles);
    setArcs(concatenatedUi.arcs);
  }, [forces, length, decodedForces, supports, moments, loads]);

  return <Canvas lines={lines} texts={texts} circles={circles} arcs={arcs} />;
};
