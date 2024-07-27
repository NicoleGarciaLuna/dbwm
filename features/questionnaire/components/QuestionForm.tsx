import { Col, Input, Select, Checkbox, DatePicker, Form } from "antd";

type QuestionFormProps = {
  questionData: Question;
  diagnosis: number;
};

type Question = {
  id: number;
  question: string;
  type: "fill" | "single" | "multiple" | "date" | "number";
  options?: Option[];
  locked: boolean;
  required: boolean;
};

type Option = string | { text: string; value: any };

const QuestionForm = ({ questionData, diagnosis }: QuestionFormProps) => {
  const { question, type, options, locked, required } = questionData;
  const isLocked = locked && diagnosis !== 1;

  const renderQuestion = () => {
    switch (type) {
      case "fill":
        return (
          <Input
            placeholder={`Ingrese su ${question.toLowerCase()}`}
            disabled={isLocked}
            type="text"
          />
        );
      case "single":
        return (
          <Select placeholder="Seleccione una opción" disabled={isLocked}>
            {options?.map((option) => (
              <Select.Option
                key={typeof option === "string" ? option : option.value}
                value={typeof option === "string" ? option : option.value}
              >
                {typeof option === "string" ? option : option.text}
              </Select.Option>
            ))}
          </Select>
        );
      case "multiple":
        return (
          <Checkbox.Group
            options={options?.map((option) =>
              typeof option === "string"
                ? option
                : { label: option.text, value: option.value }
            )}
            disabled={isLocked}
          />
        );
      case "date":
        return <DatePicker disabled={isLocked} placeholder="AAAA-MM-DD" />;
      case "number":
        return (
          <Input
            type="number"
            placeholder={`Ingrese su ${question.toLowerCase()}`}
            disabled={isLocked}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Col xs={24} sm={12} md={12} lg={6}>
      <Form.Item
        label={question}
        name={question}
        rules={[
          {
            required: required,
            message: `Por favor, complete la pregunta.`,
          },
        ]}
      >
        {renderQuestion()}
      </Form.Item>
    </Col>
  );
};

export default QuestionForm;
