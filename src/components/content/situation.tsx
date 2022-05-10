import { useContext, useEffect, useState } from "react";
import { SituationContext } from "../../context/situation.context";
import { Force } from "../../types/force";
import { Moment } from "../../types/moment";
import { CanvasUiElements } from "../../ui/CanvasUiElements";
import { UiElement } from "../../ui/uiElement";
import { Canvas } from "./canvas";

export const Situation = () => {
  const { forces, length, decodedForces, supports, moments, loads, positions } =
    useContext(SituationContext);

  const [data, setData] = useState<UiElement>({
    arcs: [],
    circles: [],
    lines: [],
    texts: [],
  });

  const concatUiElements = (data: Array<UiElement>) =>
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
    return concatUiElements(
      forces.map((force) => CanvasUiElements.getForceData(force, length, color))
    );
  };

  const processMoments = (moments: Array<Moment>, color = "black") => {
    return concatUiElements(
      moments.map((m) => CanvasUiElements.getMomentData(m, length, color))
    );
  };

  const processBase = () => {
    return CanvasUiElements.getBaseData(length);
  };

  const processSupports = () => {
    return concatUiElements(
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

    return concatUiElements(
      loads.map((load) => CanvasUiElements.getLoadData(load, length, maxValue))
    );
  };

  const processPositions = (positions: Array<number>) => {
    return CanvasUiElements.getMeasurementData(positions, length);
  };

  useEffect(() => {
    if (length === 0) {
      setData({
        arcs: [],
        circles: [],
        lines: [],
        texts: [],
      });
      return;
    }

    const baseUi = processBase();
    const decodedforcesUi = processForces(decodedForces, "blue");
    const supportsUi = processSupports();
    const momentsUi = processMoments(moments, "brown");
    const supportMomentsUi = processMoments(
      supports.filter((s) => s.moment).map((s) => s.moment) as Array<Moment>,
      "brown"
    );
    const loadsUi = processLoads();
    const positionsUi = processPositions(positions);
    const forcesUi = processForces(forces, "green");

    setData(
      concatUiElements([
        baseUi,
        decodedforcesUi,
        supportsUi,
        momentsUi,
        loadsUi,
        positionsUi,
        forcesUi,
        supportMomentsUi,
      ])
    );
  }, [forces, length, decodedForces, supports, moments, loads]);

  return <Canvas data={data} />;
};
