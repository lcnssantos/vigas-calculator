import React from "react";
import { Card } from "react-bootstrap";
import Latex from "react-latex";

export interface Formula {
  title: string;
  code: string;
}

interface FormulaCardProps {
  formulas: Array<Formula>;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({ formulas }) => {
  return (
    <>
      {formulas.map((formula) => (
        <Card key={formula.code} style={{ textAlign: "center" }}>
          <Card.Header style={{ fontWeight: "500" }}>
            {formula.title}
          </Card.Header>
          <Card.Body style={{ fontWeight: "100" }}>
            <Latex>{formula.code}</Latex>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
