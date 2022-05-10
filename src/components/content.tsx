import React from "react";
import {Container} from "react-bootstrap";
import {Formulas} from "../types/props";
import {Situation} from "./content/situation";
import Panel from "./content/panel";

export const Content: React.FC<Formulas> = ({formula}) => {
    return (
        <Container style={{minWidth: "88%", height: "100%", overflow: "scroll", margin: 0}}>
            <Situation/>
            <Panel formula={formula}/>
        </Container>
    );
};

export default Content;
