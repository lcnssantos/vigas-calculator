import {Card} from "react-bootstrap";
import React from "react";
import {Formulas} from "../types/props";

export const FormulaBox: React.FC<Formulas> = ({formula}) => {
    return (
        <>
            <Card style={{textAlign: 'center'}}>
                <Card.Header style={{fontWeight: '500'}}>Somatório das forças em Y</Card.Header>
                <Card.Body style={{fontWeight: '100'}}>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            {formula.YSum}
                            {' '}
                        </p>

                    </blockquote>
                </Card.Body>
            </Card>

            <Card style={{textAlign: 'center', margin: '2rem 0'}}>
                <Card.Header style={{fontWeight: '500'}}>Somatório das forças em X</Card.Header>
                <Card.Body style={{fontWeight: '100'}}>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            {formula.XSum}
                            {' '}
                        </p>
                    </blockquote>
                </Card.Body>
            </Card>
        </>
    );
}

export default FormulaBox;