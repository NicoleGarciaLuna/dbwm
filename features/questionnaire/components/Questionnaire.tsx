import { useState, useEffect, createRef, RefObject } from "react";
import { Tabs, Form, Row, Button, message, Space, FormInstance } from "antd";
import QuestionForm from "./QuestionForm";
import { questionnaireData, Category } from "../config";
import { supabaseClient } from "@/shared/utils/supabase/client";
import dayjs from "dayjs";

type DiagnosisData = {
  [diagnosis: number]: {
    [name: string]: any;
  };
};

const fetchDiagnosisData = async (
  id_persona: number
): Promise<DiagnosisData> => {
  const { data, error } = await supabaseClient
    .from("vista_completa_diagnostico")
    .select()
    .eq("id_persona", id_persona);

  if (error) {
    console.error(error);
    return {};
  }

  const formattedData: DiagnosisData = {};

  data.forEach((entry: any) => {
    const diagnosisId = entry.id_diagnostico;
    if (!formattedData[diagnosisId]) {
      formattedData[diagnosisId] = {};
    }

    Object.keys(entry).forEach((key) => {
      if (key !== "id_diagnostico") {
        let value = entry[key];
        // Convertir a objeto dayjs si es una fecha
        if (key.includes("fecha") && value) {
          value = dayjs(value);
        }
        formattedData[diagnosisId][key] = value;
      }
    });
  });

  console.log(formattedData);
  return formattedData;
};

type QuestionnaireProps = {
  id_persona: number;
};

const Questionnaire = ({ id_persona }: QuestionnaireProps) => {
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
      const data = await fetchDiagnosisData(id_persona);
      setFormData(data);
      setInitValuesKey((key) => key + 1);
    };

    loadData();
  }, [id_persona]);

  const handleDiagnosisSelection = (index: number) => {
    setSelectedDiagnosis(index);
    setInitValuesKey((key) => key + 1);
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
    categoryData: Category,
    diagnosis: number
  ) => (
    <Form
      layout="vertical"
      onFinish={handleFinish(diagnosis)}
      onFinishFailed={handleFinishFailed}
      className="category-form"
      ref={formRefs[diagnosis - 1]}
      initialValues={formData[diagnosis]}
      key={`${category}-${diagnosis}-${initValuesKey}`}
    >
      <Row gutter={[16, 16]}>
        {categoryData.questions.map((question) => (
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
    ([category, categoryData]) => ({
      label: category,
      key: category,
      children: renderCategoryForm(category, categoryData, selectedDiagnosis),
    })
  );

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Space>
          {Object.keys(formData).map((diagnosisId, index) => (
            <Button
              key={index}
              type={
                selectedDiagnosis === Number(diagnosisId)
                  ? "primary"
                  : "default"
              }
              onClick={() => handleDiagnosisSelection(Number(diagnosisId))}
            >
              Diagnóstico {diagnosisId}
            </Button>
          ))}
        </Space>
      </div>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default Questionnaire;
