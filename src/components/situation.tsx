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

export const Situation = () => {
  const { forces, length, decodedForces, supports, moments, loads, positions } =
    useContext(SituationContext);

  const [lines, setLines] = useState<Array<Line>>([]);
  const [texts, setTexts] = useState<Array<Text>>([]);
  const [circles, setCircles] = useState<Array<Circle>>([]);
  const [arcs, setArcs] = useState<Array<Arc>>([]);

  const processForces = (forces: Array<Force>, color = "black") => {
    const lines = forces
      .map((force) => CanvasUiElements.getForceData(force, length, color).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = forces.map(
      (force) => CanvasUiElements.getForceData(force, length, color).texts[0]
    );

    return { lines, texts };
  };

  const processMoments = (moments: Array<Moment>, color = "black") => {
    const arcs = moments.map(
      (m) => CanvasUiElements.getMomentData(m, length).arcs[0]
    );
    const texts = moments.map(
      (m) => CanvasUiElements.getMomentData(m, length).texts[0]
    );
    const lines = moments
      .map((m) => CanvasUiElements.getMomentData(m, length).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    return {
      arcs,
      texts,
      lines,
    };
  };

  const processBase = () => {
    return CanvasUiElements.getBaseData(
      length,
      CanvasUiElements.getScaleValue(length)
    );
  };

  const processSupports = () => {
    const lines = supports
      .map(
        (support) =>
          CanvasUiElements.getSupportData(support, length, "purple").lines
      )
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = supports.map(
      (support) =>
        CanvasUiElements.getSupportData(support, length, "purple").texts[0]
    );

    const circles = supports
      .map(
        (support) =>
          CanvasUiElements.getSupportData(support, length, "purple").circles
      )
      .reduce((out, circles) => [...out, ...circles], []);

    return { lines, texts, circles };
  };

  const processLoads = () => {
    const absoluteValues = loads
      .map((l) => [Math.abs(l.finalValue), Math.abs(l.initialValue)])
      .reduce((out, values) => [...out, ...values], []);

    const maxValue = Math.max(...absoluteValues);

    const lines = loads
      .map((load) => CanvasUiElements.getLoadData(load, length, maxValue).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = loads
      .map((load) => CanvasUiElements.getLoadData(load, length, maxValue).texts)
      .reduce((out, texts) => [...out, ...texts], []);

    return { lines, texts };
  };

  const getLoadForces = () => {
    return loads.map((l) => l.resultForces).reduce((o, f) => [...o, ...f], []);
  };

  const processPositions = (positions: Array<number>) => {
    return CanvasUiElements.getMeasurementData(positions, length);
  };

  useEffect(() => {
    setLines([
      ...processBase().lines,
      //...processForces(forces, "blue").lines,
      ...processForces(decodedForces, "green").lines,
      ...processSupports().lines,
      ...processMoments(moments).lines,
      ...processLoads().lines,
      ...processPositions(positions).lines,
    ]);

    setTexts([
      //...processForces(forces, "blue").texts,
      ...processForces(decodedForces, "green").texts,
      ...processSupports().texts,
      ...processMoments(moments).texts,
      ...processLoads().texts,
      ...processPositions(positions).texts,
    ]);

    setCircles([...processSupports().circles]);

    setArcs([...processMoments(moments).arcs]);
  }, [forces, length, decodedForces, supports, moments, loads]);

  return <Canvas lines={lines} texts={texts} circles={circles} arcs={arcs} />;
};
