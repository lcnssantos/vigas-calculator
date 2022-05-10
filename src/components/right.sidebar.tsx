import React from "react";
import {Container} from "react-bootstrap";
import {Props} from "../types/props";


export const RightSidebar: React.FC<Props> = ({title, children}) => {

    return (
        <Container style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'scroll',
            width: '12%',
            backgroundColor: '#e9ecef'
        }}>
            <h4 style={{margin: '6px 0 0 12px', fontWeight: '600', fontSize: '1.1rem'}}>{title}</h4>
            {children}
        </Container>
    );
}

export default RightSidebar