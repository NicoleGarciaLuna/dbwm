"use client";
import Questionnaire from "@/features/questionnaire/components/Questionnaire";

const QuestionnairePage = ({ params }: { params: { id: string } }) => {
  const personaId = parseInt(params.id[0], 10);

  return (
    <div style={{ padding: "20px" }}>
      <Questionnaire id_persona={personaId} />
    </div>
  );
};

export default QuestionnairePage;
