import {Tabs, Tab, Container} from "react-bootstrap";
import React, {useState} from "react";
import FormulaBox from "./formulaBox";
import Chart from "./chart";
import {Formula} from "../../types/formula";

export type Props = {
    formula: Formula
}

const Panel: React.FC<Props> = ({formula}) => {
    const [key, setKey] = useState('formula');

    return (
        <Container
            style={{
                padding: 0,
                margin: '2rem auto 4rem auto'
            }}
        >
            <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k || 'formula')}
                className="mb-3"
            >
                <PanelTab eventKey="formula" title="Somatório de Forças" disabled={false}>
                    <FormulaBox formula={formula}/>
                </PanelTab>

                <PanelTab eventKey="internalForces" title="Esforços Internos" disabled={true}>
                    hi
                </PanelTab>

                <PanelTab eventKey="diagram" title="Diagramas" disabled={false}>
                    <Chart/>
                </PanelTab>
            </Tabs>
        </Container>
    );
}

type TabProp = {
    eventKey: string,
    title: string,
    disabled: boolean;
}

const PanelTab: React.FC<TabProp> = ({eventKey, title, disabled, children}) => {
    return (
        <Tab
            eventKey={eventKey}
            title={title}
            style={{
                padding: '2rem 0',
                margin: 0
            }}
            disabled={disabled}
        >
            {children}
        </Tab>
    );
}

export default Panel;