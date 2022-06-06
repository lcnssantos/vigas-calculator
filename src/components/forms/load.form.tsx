import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Load as LoadType } from "../../types/load";

interface FormProps extends LoadType {}

interface LoadProps {
  onSubmit: (props: FormProps) => void;
  enabled: boolean;
}

export const LoadForm: FC<LoadProps> = ({ onSubmit, enabled }) => {
  const { register, handleSubmit, reset } = useForm<FormProps>();

  return (
    <Form
      style={{ marginTop: "24px" }}
      className="w-100 d-flex flex-column align-items-center"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <h6>Carga</h6>
      <Form.Control
        type="text"
        placeholder="ID"
        className="bg-dark w-100 m-1 text-light"
        {...register("id", { required: true })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Valor inicial (kN)"
        className="bg-dark w-100 m-1 text-light"
        {...register("initialValue", { required: true, valueAsNumber: true })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Valor final (kN)"
        className="bg-dark w-100 m-1 text-light"
        {...register("finalValue", { required: true, valueAsNumber: true })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Posição Inicial (m)"
        className="bg-dark w-100 m-1 text-light"
        {...register("initialPosition", {
          required: true,
          valueAsNumber: true,
        })}
        size="sm"
      />
      <Form.Control
        type="text"
        placeholder="Posição final (m)"
        className="bg-dark w-100 m-1 text-light"
        {...register("finalPosition", { required: true, valueAsNumber: true })}
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
