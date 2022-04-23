import { useContext, useEffect, useState } from "react";
import { SituationContext } from "../context/situation.context";
import { Arc } from "../types/arc";
import { Circle } from "../types/circle";
import { Force } from "../types/force";
import { Line } from "../types/line";
import { Moment } from "../types/moment";
import { Text } from "../types/text";
import { Canvas } from "./canvas";
import {
  getBaseData,
  getForceData,
  getLoadData,
  getMeasurementData,
  getMomentData,
  getScaleValue,
  getSupportData,
} from "./utils/ui";

export const Situation = () => {
  const { forces, length, decodedForces, supports, moments, loads, positions } =
    useContext(SituationContext);

  const [lines, setLines] = useState<Array<Line>>([]);
  const [texts, setTexts] = useState<Array<Text>>([]);
  const [circles, setCircles] = useState<Array<Circle>>([]);
  const [arcs, setArcs] = useState<Array<Arc>>([]);

  const processForces = (forces: Array<Force>, color = "black") => {
    const lines = forces
      .map((force) => getForceData(force, length, color).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = forces.map(
      (force) => getForceData(force, length, color).text
    );

    return { lines, texts };
  };

  const processMoments = (moments: Array<Moment>, color = "black") => {
    const arcs = moments.map((m) => getMomentData(m, length).arc);
    const texts = moments.map((m) => getMomentData(m, length).text);
    const lines = moments
      .map((m) => getMomentData(m, length).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    return {
      arcs,
      texts,
      lines,
    };
  };

  const processBase = () => {
    return getBaseData(length, getScaleValue(length));
  };

  const processSupports = () => {
    const lines = supports
      .map((support) => getSupportData(support, length, "purple").lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = supports.map(
      (support) => getSupportData(support, length, "purple").text
    );

    const circles = supports
      .map((support) => getSupportData(support, length, "purple").circles)
      .reduce((out, circles) => [...out, ...circles], []);

    return { lines, texts, circles };
  };

  const getSupportForces = () => {
    return supports.map((s) => s.forces).reduce((o, f) => [...o, ...f], []);
  };

  const getSupportMoments = () =>
    supports.filter((s) => s.moment).map((s): Moment => s.moment as any);

  const processLoads = () => {
    const lines = loads
      .map((load) => getLoadData(load, length).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = loads
      .map((load) => getLoadData(load, length).texts)
      .reduce((out, texts) => [...out, ...texts], []);

    return { lines, texts };
  };

  const getLoadForces = () => {
    return loads.map((l) => l.resultForces).reduce((o, f) => [...o, ...f], []);
  };

  const getAllForces = () => {
    return [
      ...forces,
      ...getSupportForces(),
      ...getLoadForces(),
      ...decodedForces,
    ];
  };

  const getForceMoments = (forces: Array<Force>) => {
    return forces.filter((f) => f.moment).map((f): Moment => f.moment as any);
  };

  const processPositions = (positions: Array<number>) => {
    return getMeasurementData(positions, length);
  };

  useEffect(() => {
    setLines([
      ...processBase(),
      ...processForces(forces, "blue").lines,
      ...processForces(getSupportForces(), "red").lines,
      ...processForces(getLoadForces(), "green").lines,
      ...processForces(decodedForces, "green").lines,
      ...processSupports().lines,
      ...processMoments(getSupportMoments()).lines,
      ...processMoments(moments).lines,
      ...processMoments(getForceMoments(getAllForces())).lines,
      ...processLoads().lines,
      ...processPositions(positions).lines,
    ]);

    setTexts([
      ...processForces(forces, "blue").texts,
      ...processForces(getSupportForces(), "red").texts,
      ...processForces(getLoadForces(), "green").texts,
      ...processForces(decodedForces, "green").texts,
      ...processSupports().texts,
      ...processMoments(getSupportMoments()).texts,
      ...processMoments(moments).texts,
      ...processMoments(getForceMoments(getAllForces())).texts,
      ...processLoads().texts,
      ...processPositions(positions).texts,
    ]);

    setCircles([...processSupports().circles]);

    setArcs([
      ...processMoments(getSupportMoments()).arcs,
      ...processMoments(moments).arcs,
      ...processMoments(getForceMoments(getAllForces())).arcs,
    ]);
  }, [forces, length, decodedForces, supports, moments, loads]);

  return <Canvas lines={lines} texts={texts} circles={circles} arcs={arcs} />;
};
