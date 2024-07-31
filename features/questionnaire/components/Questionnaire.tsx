import { useState, useEffect, useRef, createRef } from "react";
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
    console.error("Error fetching diagnosis data:", error);
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
        if (key.includes("fecha") && value) {
          value = dayjs(value);
        }
        formattedData[diagnosisId][key] = value;
      }
    });
  });

  return formattedData;
};

const createDiagnosisIndexMap = (
  diagnosisIds: number[],
  minDiagnoses: number
): { [key: number]: number | null } => {
  const map = diagnosisIds.reduce((map, id, index) => {
    map[id] = index + 1;
    return map;
  }, {} as { [key: number]: number | null });

  for (let i = diagnosisIds.length + 1; i <= minDiagnoses; i++) {
    map[i] = null;
  }

  return map;
};

type QuestionnaireProps = {
  id_persona: number;
};

const Questionnaire = ({ id_persona }: QuestionnaireProps) => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<number>(1);
  const [formData, setFormData] = useState<DiagnosisData>({});
  const [formRefs, setFormRefs] = useState<React.RefObject<FormInstance>[]>([]);
  const [initValuesKey, setInitValuesKey] = useState<number>(0);
  const [diagnosisIndexMap, setDiagnosisIndexMap] = useState<{
    [key: number]: number | null;
  }>({});
  const initialized = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDiagnosisData(id_persona);
      let diagnosisIds = Object.keys(data).map(Number);

      const missingDiagnoses = 3 - diagnosisIds.length;
      if (missingDiagnoses > 0 && !initialized.current) {
        initialized.current = true;
        for (let i = 0; i < missingDiagnoses; i++) {
          const { data: newDiagnosticoData, error: newDiagnosticoError } =
            await supabaseClient
              .from("diagnostico")
              .insert([{ id_persona, fecha_diagnostico: new Date() }])
              .select("id_diagnostico");

          if (newDiagnosticoError) {
            console.error("Error creating new diagnosis:", newDiagnosticoError);
            throw newDiagnosticoError;
          }

          const newDiagnosisId = newDiagnosticoData[0].id_diagnostico;
          data[newDiagnosisId] = {};
          diagnosisIds.push(newDiagnosisId);

          for (const [category, categoryData] of Object.entries(
            questionnaireData
          )) {
            const tableName = categoryData["stored-procedure"].replace(
              "upsert_",
              ""
            );
            await supabaseClient
              .from(tableName)
              .insert([{ id_diagnostico: newDiagnosisId }]);
          }
        }
      }

      const indexMap = createDiagnosisIndexMap(diagnosisIds, 3);
      setDiagnosisIndexMap(indexMap);
      setFormData(data);

      const totalDiagnoses = Math.max(diagnosisIds.length, 3);
      setFormRefs(
        new Array(totalDiagnoses)
          .fill(null)
          .map(() => createRef<FormInstance>())
      );
      setInitValuesKey((key) => key + 1);
    };

    loadData();
  }, [id_persona]);

  const handleDiagnosisSelection = (diagnosisIndex: number) => {
    setSelectedDiagnosis(diagnosisIndex);
    setInitValuesKey((key) => key + 1);
  };

  const handleFinish = (diagnosisIndex: number) => async (values: any) => {
    console.log(
      `Received values of form for diagnosis ${diagnosisIndex}:`,
      values
    );

    let originalDiagnosisId = Object.keys(diagnosisIndexMap).find(
      (key) => diagnosisIndexMap[Number(key)] === diagnosisIndex
    );

    try {
      const category = Object.entries(questionnaireData).find(([_, data]) =>
        data.questions.some((q) => q.name in values)
      );

      if (category) {
        const [, categoryData] = category;
        const storedProcedure = categoryData["stored-procedure"];

        const filteredValues = Object.keys(values).reduce((acc, key) => {
          const question = categoryData.questions.find((q) => q.name === key);
          if (question && question.type !== "multiple") {
            acc[key] = values[key];
          }
          return acc;
        }, {} as Record<string, any>);
        console.log("Filtered values:", filteredValues);

        if (storedProcedure === "upsert_persona") {
          console.log("Upserting persona with values:", filteredValues);
          const { data, error } = await supabaseClient
            .from("persona")
            .upsert([{ id_persona, ...filteredValues }], {
              onConflict: "id_persona",
            });

          if (error) {
            throw error;
          }

          message.success(`Datos guardados exitosamente en la tabla persona.`);
        } else {
          if (!originalDiagnosisId) {
            console.log(
              "Creating new diagnosis entry for id_persona:",
              id_persona
            );
            const { data: newDiagnosticoData, error: newDiagnosticoError } =
              await supabaseClient
                .from("diagnostico")
                .insert([{ id_persona, fecha_diagnostico: new Date() }])
                .select("id_diagnostico");

            if (newDiagnosticoError) {
              throw newDiagnosticoError;
            }

            originalDiagnosisId = newDiagnosticoData[0].id_diagnostico;

            const updatedData = await fetchDiagnosisData(id_persona);
            setFormData(updatedData);
            const updatedDiagnosisIds = Object.keys(updatedData).map(Number);
            const updatedIndexMap = createDiagnosisIndexMap(
              updatedDiagnosisIds,
              3
            );
            setDiagnosisIndexMap(updatedIndexMap);
            setInitValuesKey((key) => key + 1);
          }

          console.log(
            "Sending data to table with diagnosis id:",
            originalDiagnosisId
          );
          const tableName = storedProcedure.replace("upsert_", "");
          const idTable = `id_${tableName}`;

          let tableRecord = (
            formData[Number(originalDiagnosisId)] as { [key: string]: any }
          )[idTable];

          console.log(
            `Upserting record into table ${tableName} for diagnosis id ${originalDiagnosisId}`
          );
          const { data: upsertData, error: upsertError } = await supabaseClient
            .from(tableName)
            .upsert(
              [{ id_diagnostico: originalDiagnosisId, ...filteredValues }],
              {
                onConflict: "id_diagnostico",
              }
            )
            .select(idTable);

          if (upsertError) {
            console.error(
              `Error upserting record into table ${tableName}:`,
              upsertError
            );
            throw upsertError;
          }

          tableRecord = (upsertData[0] as { [key: string]: any })[idTable];

          setFormData((prevData) => ({
            ...prevData,
            [Number(originalDiagnosisId)]: {
              ...prevData[Number(originalDiagnosisId)],
              [idTable]: tableRecord,
            },
          }));

          for (const [key, value] of Object.entries(values)) {
            const question = categoryData.questions.find((q) => q.name === key);
            if (question && question.type === "multiple") {
              const intermediateTable = question.intermediate_table;

              if (intermediateTable) {
                console.log(
                  "Deleting existing relationships in table:",
                  intermediateTable
                );
                const { error: deleteError } = await supabaseClient
                  .from(intermediateTable)
                  .delete()
                  .eq(idTable, tableRecord);

                if (deleteError) {
                  console.error(
                    "Error deleting existing relationships:",
                    deleteError
                  );
                  throw deleteError;
                }

                const upsertData = (value as number[]).map((id_value) => ({
                  [idTable]: tableRecord,
                  [`id_${key}`]: id_value,
                }));

                console.log(
                  "Upserting data into intermediate table:",
                  intermediateTable,
                  "with values:",
                  upsertData
                );
                const { data: upsertResponse, error: upsertError } =
                  await supabaseClient
                    .from(intermediateTable)
                    .upsert(upsertData, {
                      onConflict: `${idTable}, id_${key}`,
                    });

                if (upsertError) {
                  console.error(
                    "Error upserting into intermediate table:",
                    intermediateTable,
                    upsertError
                  );
                  throw upsertError;
                }
                console.log("Upsert result:", upsertResponse);
              }
            }
          }

          message.success(
            `Datos del diagnóstico ${diagnosisIndex} guardados exitosamente.`
          );
        }
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      message.error("Hubo un error al guardar los datos.");
    }
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.error("Form submission failed with error:", errorInfo);
    message.error("Por favor, complete todas las preguntas obligatorias.");
  };

  const renderCategoryForm = (
    category: string,
    categoryData: Category,
    diagnosisIndex: number
  ) => {
    const originalDiagnosisId = Object.keys(diagnosisIndexMap).find(
      (key) => diagnosisIndexMap[Number(key)] === diagnosisIndex
    );

    return (
      <Form
        layout="vertical"
        onFinish={handleFinish(diagnosisIndex)}
        onFinishFailed={handleFinishFailed}
        className="category-form"
        ref={formRefs[diagnosisIndex - 1]}
        initialValues={
          originalDiagnosisId ? formData[Number(originalDiagnosisId)] : {}
        }
        key={`${category}-${diagnosisIndex}-${initValuesKey}`}
      >
        <Row gutter={[16, 16]}>
          {categoryData.questions.map((question) => (
            <QuestionForm
              key={question.id}
              questionData={question}
              diagnosis={diagnosisIndex}
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
  };

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
          {[1, 2, 3].map((diagnosisIndex) => (
            <Button
              key={diagnosisIndex}
              type={
                selectedDiagnosis === diagnosisIndex ? "primary" : "default"
              }
              onClick={() => handleDiagnosisSelection(diagnosisIndex)}
            >
              Diagnóstico {diagnosisIndex}
            </Button>
          ))}
        </Space>
      </div>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default Questionnaire;
