import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface FormProps {
  size: number;
}

interface BarProps {
  onSubmit: (props: FormProps) => void;
  defaultValue: number;
}

export const BarForm: FC<BarProps> = ({ onSubmit, defaultValue }) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormProps>({
    defaultValues: {
      size: defaultValue,
    },
  });

  return (
    <Form
      className="w-100 d-flex flex-column align-items-center"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setValue("size", data.size);
      })}
    >
      <h6>Viga</h6>
      <Form.Control
        type="text"
        placeholder="Tamanho barra (m)"
        className="bg-dark w-100 m-1 text-light"
        {...register("size", { required: true, valueAsNumber: true })}
        size="sm"
      />
      <Button
        type="submit"
        variant="success"
        className="w-100"
        style={{ marginTop: "10px" }}
        size="sm"
      >
        Definir
      </Button>
    </Form>
  );
};
