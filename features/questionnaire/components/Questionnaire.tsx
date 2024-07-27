import { useState, useEffect, createRef, RefObject } from "react";
import { Tabs, Form, Row, Button, message, Space, FormInstance } from "antd";
import QuestionForm from "./QuestionForm";
import { questionnaireData, Question } from "../config";

type DiagnosisData = {
  [diagnosis: number]: {
    [category: string]: { [question: string]: any };
  };
};

const fetchDiagnosisData = async (): Promise<DiagnosisData> => {
  // Simula una llamada a la base de datos
  return {
    1: {
      "Datos Básicos": { Nombre: "Juan", "Primer apellido": "Perez" },
      Personal: { "Ocupación, oficio o profesión": "Ingeniero" },
    },
    2: {
      "Datos Básicos": { Nombre: "Maria", "Primer apellido": "Gomez" },
    },
  };
};

const Questionnaire = () => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<number>(1);
  const [formData, setFormData] = useState<DiagnosisData>({});
  const [formRefs] = useState<RefObject<FormInstance>[]>([
    createRef<FormInstance>(),
    createRef<FormInstance>(),
    createRef<FormInstance>(),
  ]);
  const [initValuesKey, setInitValuesKey] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDiagnosisData();
      setFormData(data);
      setInitValuesKey((key) => key + 1); // Actualización funcional
    };

    loadData();
  }, []);

  const handleDiagnosisSelection = (index: number) => {
    setSelectedDiagnosis(index);
    setInitValuesKey((key) => key + 1); // Actualización funcional
  };

  const handleFinish = (diagnosis: number) => (values: any) => {
    console.log(`Received values of form for diagnosis ${diagnosis}:`, values);
    message.success(
      `Datos del diagnóstico ${diagnosis} guardados exitosamente.`
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      [diagnosis]: { ...prevFormData[diagnosis], ...values },
    }));
  };

  const handleFinishFailed = (errorInfo: any) => {
    message.error("Por favor, complete todas las preguntas obligatorias.");
  };

  const renderCategoryForm = (
    category: string,
    questions: Question[],
    diagnosis: number
  ) => (
    <Form
      layout="vertical"
      onFinish={handleFinish(diagnosis)}
      onFinishFailed={handleFinishFailed}
      className="category-form"
      ref={formRefs[diagnosis - 1]}
      initialValues={formData[diagnosis]?.[category]}
      key={`${category}-${diagnosis}-${initValuesKey}`} // Combinar con la clave única
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
        <Button type="primary" htmlType="submit" className="submit-button">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );

  const items = Object.entries(questionnaireData).map(
    ([category, questions]) => ({
      label: category,
      key: category,
      children: renderCategoryForm(category, questions, selectedDiagnosis),
    })
  );

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Space>
          {[1, 2, 3].map((index) => (
            <Button
              key={index}
              type={selectedDiagnosis === index ? "primary" : "default"}
              onClick={() => handleDiagnosisSelection(index)}
            >
              Diagnóstico {index}
            </Button>
          ))}
        </Space>
      </div>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default Questionnaire;
