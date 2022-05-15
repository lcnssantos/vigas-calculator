import React, { useContext, useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { SituationContext } from "../context/situation.context";
import { Situation } from "../types/situation";
import { EquationUtil } from "../utils/equation";
import { DoubleLinearSystem } from "../utils/math";
import Chart from "./chart";
import { Formula, FormulaCard } from "./formula_card";

const Panel = () => {
  const [key, setKey] = useState("formula");
  const [formulas, setFormulas] = useState<Array<Formula>>([]);
  const { forces, length, loads, moments, supports } =
    useContext(SituationContext);

  useEffect(() => {
    const situation = new Situation(length, supports, forces, moments, loads);

    const { x: horizontalForces, y: verticalForces } =
      situation.getDecodedForces();

    const decodedMoments = situation.getDecodedMoments();

    const { latex: horizontalLatex } =
      EquationUtil.getHorizontal(horizontalForces);

    const {
      latex: verticalLatex,
      equation: verticalEquation,
      unknow,
    } = EquationUtil.getVertical(verticalForces);

    const { latex: momentLatex, equation: momentEquation } =
      EquationUtil.getMoments(decodedMoments);

    const tempFormulas = [];

    if (horizontalForces.length > 0) {
      tempFormulas.push({
        title: "Somatória forças em X",
        code: horizontalLatex,
      });
    }

    if (verticalForces.length > 0) {
      tempFormulas.push({
        title: "Somatória forças em y",
        code: verticalLatex,
      });
    }

    if (decodedMoments.length > 0) {
      tempFormulas.push({
        title: "Somatória momentos",
        code: momentLatex,
      });
    }

    if (unknow.length === 2) {
      const system = new DoubleLinearSystem(verticalEquation, momentEquation);
      const solution = system.solve();

      tempFormulas.push({
        title: "Solução",
        code: `$ ${unknow[0].id.split("").join("_")} = ${
          solution.x
        } \\:\\:\\:\\:\\:\\: |\\:\\:\\:\\:\\:\\: ${unknow[1].id
          .split("")
          .join("_")} = ${solution.y} $`,
      });
    }

    setFormulas(tempFormulas);
  }, [forces, length, loads, moments, supports]);

  return (
    <Container
      style={{
        padding: 0,
        margin: "2rem auto 4rem auto",
      }}
    >
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k || "formula")}
        className="mb-3"
      >
        <PanelTab
          eventKey="formula"
          title="Somatório de Forças"
          disabled={false}
        >
          <FormulaCard formulas={formulas} />
        </PanelTab>

        <PanelTab
          eventKey="internalForces"
          title="Esforços Internos"
          disabled={true}
        >
          hi
        </PanelTab>

        <PanelTab eventKey="diagram" title="Diagramas" disabled={false}>
          <Chart />
        </PanelTab>
      </Tabs>
    </Container>
  );
};

type TabProp = {
  eventKey: string;
  title: string;
  disabled: boolean;
};

const PanelTab: React.FC<TabProp> = ({
  eventKey,
  title,
  disabled,
  children,
}) => {
  return (
    <Tab
      eventKey={eventKey}
      title={title}
      style={{
        padding: "2rem 0",
        margin: 0,
      }}
      disabled={disabled}
    >
      {children}
    </Tab>
  );
};

export default Panel;
