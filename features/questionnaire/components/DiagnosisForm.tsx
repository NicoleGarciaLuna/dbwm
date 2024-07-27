import { Tabs, Form, Row, Button, message } from "antd";
import QuestionForm from "./QuestionForm";

type Option = string | { text: string; value: any };

type Question = {
  id: number;
  question: string;
  type: "fill" | "single" | "multiple" | "date" | "number";
  options?: Option[];
  locked: boolean;
  required: boolean;
};

type QuestionsData = {
  [category: string]: Question[];
};

type QuestionTabsProps = {
  data: QuestionsData;
  diagnosis: number;
};

const QuestionTabs = ({ data, diagnosis }: QuestionTabsProps) => {
  const validateForm = (values: any) => {
    return Object.entries(values).filter(([key, value]) => {
      const question = Object.values(data)
        .flat()
        .find((q) => q.question === key);
      return question?.required && !value;
    });
  };

  const handleFinish = (values: any) => {
    const errors = validateForm(values);

    if (errors.length > 0) {
      message.error("Por favor, complete todas las preguntas obligatorias.");
    } else {
      console.log("Received values of form:", values);
      message.success("Datos guardados exitosamente.");
    }
  };

  const items = Object.entries(data).map(([category, questions]) => ({
    label: category,
    key: category,
    children: (
      <Form
        layout="vertical"
        onFinish={handleFinish}
        style={{
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Row gutter={[16, 16]}>
          {questions.map((question) => (
            <QuestionForm
              key={question.id}
              questionData={question}
              diagnosis={diagnosis}
            />
          ))}
        </Row>
        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#32cd32", fontSize: "large" }}
          >
            Guardar
          </Button>
        </Form.Item>
      </Form>
    ),
  }));

  return <Tabs defaultActiveKey="1" centered items={items} />;
};

export default QuestionTabs;
