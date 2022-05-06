import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Force } from "../../types/force";

interface FormProps {
  position: number;
  intensity: number;
  angle: number;
  id: string;
}

interface ForceProps {
  onSubmit: (props: Force) => void;
  enabled: boolean;
}

export const ForceForm: FC<ForceProps> = ({ onSubmit, enabled }) => {
  const { register, handleSubmit, reset } = useForm<FormProps>();

  return (
    <Form
      className="w-100 d-flex flex-column align-items-center"
      onSubmit={handleSubmit((data) => {
        onSubmit(new Force(data.id, data.intensity, data.angle, data.position));
        reset();
      })}
    >
      <h6>Força</h6>
      <Form.Control
        type="text"
        placeholder="ID"
        className="bg-dark w-100 m-1 text-light"
        {...register("id", { required: true })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Posição (m)"
        className="bg-dark w-100 m-1 text-light"
        {...register("position", { required: true, valueAsNumber: true })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Itensidade (kN)"
        className="bg-dark w-100 m-1 text-light"
        {...register("intensity", { required: true, valueAsNumber: true })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Ângulo (graus)"
        className="bg-dark w-100 m-1 text-light"
        {...register("angle", { required: true, valueAsNumber: true })}
        size="sm"
      />
      <Button
        type="submit"
        variant="success"
        className="w-100"
        style={{ marginTop: "10px" }}
        disabled={!enabled}
        size="sm"
      >
        Adicionar
      </Button>
    </Form>
  );
};
