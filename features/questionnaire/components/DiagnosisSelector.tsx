import { useState } from "react";
import { Button, Space } from "antd";
import DiagnosisForm from "./DiagnosisForm";
import { questionnaireData } from "../config";

const DiagnosisSelector = () => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<number>(1);

  const handleDiagnosisSelection = (index: number) => {
    setSelectedDiagnosis(index);
  };

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
      <DiagnosisForm diagnosis={selectedDiagnosis} data={questionnaireData} />
    </div>
  );
};

export default DiagnosisSelector;
