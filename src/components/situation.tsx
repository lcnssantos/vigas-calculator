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
  getBaseLines,
  getForceLines,
  getLoadLines,
  getMoment,
  getScale,
  getSupportLines,
} from "./utils/ui";

export const Situation = () => {
  const { forces, length, decodedForces, supports, moments, loads } =
    useContext(SituationContext);

  const [lines, setLines] = useState<Array<Line>>([]);
  const [texts, setTexts] = useState<Array<Text>>([]);
  const [circles, setCircles] = useState<Array<Circle>>([]);
  const [arcs, setArcs] = useState<Array<Arc>>([]);

  const processForces = (forces: Array<Force>, color = "black") => {
    const lines = forces
      .map((force) => getForceLines(force, length, color).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = forces.map(
      (force) => getForceLines(force, length, color).text
    );

    return { lines, texts };
  };

  const processMoments = (moments: Array<Moment>, color = "black") => {
    const arcs = moments.map((m) => getMoment(m, length).arc);
    const texts = moments.map((m) => getMoment(m, length).text);
    const lines = moments
      .map((m) => getMoment(m, length).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    return {
      arcs,
      texts,
      lines,
    };
  };

  const processBase = () => {
    const lines = getBaseLines(length, getScale(length));
    return lines;
  };

  const processSupports = () => {
    const lines = supports
      .map((support) => getSupportLines(support, length, "purple").lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = supports.map(
      (support) => getSupportLines(support, length, "purple").text
    );

    const circles = supports
      .map((support) => getSupportLines(support, length, "purple").circles)
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
      .map((load) => getLoadLines(load, length).lines)
      .reduce((out, lines) => [...out, ...lines], []);

    const texts = loads
      .map((load) => getLoadLines(load, length).texts)
      .reduce((out, texts) => [...out, ...texts], []);

    return { lines, texts };
  };

  const getLoadForces = () => {
    return loads.map((l) => l.resultForces).reduce((o, f) => [...o, ...f], []);
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
      ...processLoads().lines,
    ]);

    setTexts([
      ...processForces(forces, "blue").texts,
      ...processForces(getSupportForces(), "red").texts,
      ...processForces(getLoadForces(), "green").texts,
      ...processForces(decodedForces, "green").texts,
      ...processSupports().texts,
      ...processMoments(getSupportMoments()).texts,
      ...processMoments(moments).texts,
      ...processLoads().texts,
    ]);

    setCircles([...processSupports().circles]);

    setArcs([
      ...processMoments(getSupportMoments()).arcs,
      ...processMoments(moments).arcs,
    ]);
  }, [forces, length, decodedForces, supports, moments, loads]);

  return <Canvas lines={lines} texts={texts} circles={circles} arcs={arcs} />;
};
