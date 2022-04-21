import { FC } from "react";
import { Accordion } from "react-bootstrap";

interface AccordionProps {
  data: Array<{ title: string; child: React.ReactChild }>;
}

export const InternalAccordion: FC<AccordionProps> = ({ data }) => {
  return (
    <Accordion defaultActiveKey="0" className="bg-dark">
      {data.map((d, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header className="bg-dark">{d.title}</Accordion.Header>
          <Accordion.Body className="bg-dark">{d.child}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
