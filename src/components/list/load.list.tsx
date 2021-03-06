import { FC } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";
import { Load } from "../../types/load";

interface LoadListProps {
  loads: Array<Load>;
  remove: (data: string) => void;
}

export const LoadList: FC<LoadListProps> = ({ loads, remove }) => {
  if (loads.length === 0) {
    return <></>;
  }

  return (
    <>
      <h6 style={{ marginTop: "24px" }}>Cargas</h6>
      <ListGroup>
        {loads.map((load) => (
          <ListGroup.Item className="bg-dark text-light" key={load.id}>
            <div className="d-flex justify-content-around">
              {load.id}
              <CloseButton
                variant="white"
                onClick={() => remove(load.id)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
