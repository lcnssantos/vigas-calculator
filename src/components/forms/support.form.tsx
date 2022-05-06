import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SupportType } from "../../types/support";

interface FormProps {
  id: string;
  position: number;
  type: SupportType;
}

interface BarProps {
  onSubmit: (props: FormProps) => void;
  enabled: boolean;
  length: number;
}

export const SupportForm: FC<BarProps> = ({ onSubmit, enabled, length }) => {
  const { register, handleSubmit, reset, watch } = useForm<FormProps>();
  const state = watch();

  return (
    <Form
      className="w-100 d-flex flex-column align-items-center"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <h6>Apoio</h6>
      <Form.Control
        type="text"
        placeholder="ID"
        className="bg-dark w-100 m-1 text-light"
        {...register("id", { required: true })}
        size="sm"
      />
      <Form.Select
        className="bg-dark w-100 m-1 text-light"
        {...register("type", { required: true })}
        size="sm"
      >
        <option value={SupportType.SIMPLE}>Simples</option>
        <option value={SupportType.DOUBLE}>Duplo</option>
        <option value={SupportType.EMBED}>Engastado</option>
      </Form.Select>
      {state.type !== SupportType.EMBED && (
        <Form.Control
          type="text"
          placeholder="Posição (m)"
          className="bg-dark w-100 m-1 text-light"
          {...register("position", { required: true, valueAsNumber: true })}
          size="sm"
        />
      )}
      {state.type === SupportType.EMBED && (
        <Form.Select
          className="bg-dark w-100 m-1 text-light"
          {...register("position", { required: true, valueAsNumber: true })}
          size="sm"
        >
          <option value={0}>0</option>
          <option value={length}>{length}</option>
        </Form.Select>
      )}

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
