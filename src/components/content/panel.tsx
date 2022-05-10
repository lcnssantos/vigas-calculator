import {Tabs, Tab} from "react-bootstrap";
import React, {useState} from "react";
import {Formulas} from "../../types/props";
import FormulaBox from "./formulaBox";
import Chart from "./chart";

const Panel: React.FC<Formulas> = ({formula}) => {
    const [key, setKey] = useState('formula');

    return (
        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k || 'formula')}
            className="mb-3"
        >
            <Tab eventKey="formula" title="Somatório de Forças">
                <FormulaBox formula={formula}/>
            </Tab>

            <Tab eventKey="internalForces" title="Esforços Internos" disabled>
            </Tab>

            <Tab eventKey="diagram" title="Diagramas">
                <Chart/>
            </Tab>
        </Tabs>
    );
}

export default Panel;