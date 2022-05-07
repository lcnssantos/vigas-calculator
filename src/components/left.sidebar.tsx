import React, {useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";
import {BiCaretRight} from 'react-icons/bi';

type Props = {
    title: string,
};

export const LeftSidebar: React.FC<Props> = ({title, children}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="success"
                style={{
                    maxHeight: '10%',
                    maxWidth: '10%',
                    minHeight: '8px',
                    minWidth: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(9, 146, 104, 70%)',
                    position: 'absolute',
                    left: '-11px',
                    top: '50%'
                }}
                onClick={handleShow}>
                <BiCaretRight/>
            </Button>

            <Offcanvas style={{opacity: '0.9'}} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {children}

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default LeftSidebar