import { FC } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";
import { Support } from "../../types/support";

interface SupportListProps {
  supports: Array<Support>;
  onRemove: (data: string) => void;
}

export const SupportList: FC<SupportListProps> = ({
  supports,
  onRemove,
}) => {
  if (supports.length === 0) {
    return <></>;
  }

  return (
    <>
      <h6>Suportes</h6>
      <ListGroup>
        {supports.map((support) => (
          <ListGroup.Item className="bg-dark text-light" key={support.id}>
            <div className="d-flex justify-content-around">
              {support.id}
              <CloseButton
                variant="white"
                onClick={() => onRemove(support.id)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
