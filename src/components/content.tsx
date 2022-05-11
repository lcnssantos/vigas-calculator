import React from "react";
import {Container} from "react-bootstrap";
import {Situation} from "./content/situation";
import Panel from "./content/panel";
import {Formula} from "../types/formula";

export type Props = {
    formula: Formula,
    width: number
}

export const Content: React.FC<Props> = ({formula, width}) => {
    let contentStyle = {
        minWidth: "88%",
        height: "100%",
        overflow: "scroll",
        margin: 0
    } as React.CSSProperties;

    if (width < 900) {
        contentStyle.width = "100%";
    }

    return (
        <Container style={contentStyle}>
            <Situation/>
            <Panel formula={formula}/>
        </Container>
    );
};

export default Content;
