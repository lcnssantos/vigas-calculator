import { FC } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";
import { Moment } from "../../types/moment";

interface MomentListProps {
  moments: Array<Moment>;
  onRemove: (data: string) => void;
}

export const MomentList: FC<MomentListProps> = ({ moments, onRemove }) => {
  if (moments.length === 0) {
    return <></>;
  }

  return (
    <>
      <h6 style={{ marginTop: "24px" }}>Momentos</h6>
      <ListGroup>
        {moments.map((moment) => (
          <ListGroup.Item className="bg-dark text-light" key={moment.id}>
            <div className="d-flex justify-content-around">
              {moment.id}={moment.value}kN/m{" "}
              <CloseButton
                variant="white"
                onClick={() => onRemove(moment.id)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
