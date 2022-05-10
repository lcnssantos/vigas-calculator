import {Container} from "react-bootstrap";
import React from "react";

export type Props = {
    title: string,
    width: number
};

export const RightSidebar: React.FC<Props> = ({title, width, children}) => {
    let barStyle = {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
        width: '12%',
        backgroundColor: '#e9ecef'
    } as React.CSSProperties;

    if (width < 1100) {
        barStyle.display = "none";
    }

    return (
        <Container style={barStyle}>
            <h4 style={headerStyle}>{title}</h4>
            {children}
        </Container>
    );
}

const headerStyle = {
    margin: '6px 0 0 12px',
    fontWeight: '600',
    fontSize: '1.1rem'
} as React.CSSProperties;

export default RightSidebar
