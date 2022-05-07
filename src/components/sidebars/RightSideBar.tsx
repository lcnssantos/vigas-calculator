import React, {useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";
import {BiCaretRight} from 'react-icons/bi';

type Props = {
    title: string,
};

export const RightSideBar: React.FC<Props> = ({title, children}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="success"
                style={{
                    maxHeight: '10%',
                    maxWidth: '5%',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    textAlign: 'center',
                    borderRadius: '60%',
                    backgroundColor: 'rgba(9, 146, 104, 70%)',
                    position: 'absolute',
                    left: '-1%',
                    top: '50%'
                }}
                onClick={handleShow}>
                <BiCaretRight/>
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
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

export default RightSideBar