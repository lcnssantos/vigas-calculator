import React from "react";
import { Container } from "react-bootstrap";
import Panel from "./panel";
import { Situation } from "./situation";

export type Props = {
  width: number;
};

export const Content: React.FC<Props> = ({ width }) => {
  let contentStyle = {
    minWidth: "88%",
    height: "100%",
    overflow: "scroll",
    margin: 0,
  } as React.CSSProperties;

  if (width < 900) {
    contentStyle.width = "100%";
  }

  return (
    <Container style={contentStyle}>
      <Situation />
      <Panel />
    </Container>
  );
};

export default Content;
