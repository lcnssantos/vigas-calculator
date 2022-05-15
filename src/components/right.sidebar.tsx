import React, { useState } from "react";
import { Button, Container, Offcanvas } from "react-bootstrap";
import { BiMenu } from "react-icons/all";

export type Props = {
  title: string;
  width: number;
};

export const RightSidebar: React.FC<Props> = ({ title, width, children }) => {
  let isMobile = false;
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    setIsOpen(true);
  };

  const headerStyle = {
    margin: "6px 0 0 12px",
    fontWeight: "600",
    fontSize: "1.1rem",
  } as React.CSSProperties;

  const iconStyle = {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "2rem",
    width: "2rem",
    position: "absolute",
    top: "10px",
    right: "0",
  } as React.CSSProperties;

  let barStyle = {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    width: "12%",
    backgroundColor: "#e9ecef",
  } as React.CSSProperties;

  const openBarStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties;

  if (width < 900) {
    isMobile = true;

    barStyle = {
      display: "none",
    };
  } else if (width > 900) {
    isMobile = false;
  }

  return (
    <>
      {!isMobile ? (
        <></>
      ) : (
        <Button
          variant="primary"
          style={iconStyle}
          onClick={handleShow}
          className="me-2"
        >
          <BiMenu onClick={handleClick} />
        </Button>
      )}

      {!isOpen ? (
        <></>
      ) : (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={openBarStyle}>{children}</Offcanvas.Body>
        </Offcanvas>
      )}

      <Container style={barStyle}>
        <h4 style={headerStyle}>{title}</h4>
        {children}
      </Container>
    </>
  );
};

export default RightSidebar;
