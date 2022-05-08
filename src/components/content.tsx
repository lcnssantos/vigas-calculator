import {Container} from "react-bootstrap";
import {Situation} from "./situation";
import FormulaBox from "./formulaBox";
import React from "react";
import {Formulas} from "../types/props";

export const Content: React.FC<Formulas> = ({formula}) => {
    return (
        <Container style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <Situation/>
            <FormulaBox formula={formula}/>
        </Container>
    )
}

export default Content;