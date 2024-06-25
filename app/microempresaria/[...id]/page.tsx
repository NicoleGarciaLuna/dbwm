import {
  fetchPersonalInfo,
  fetchGenderVariables,
  fetchEntrepreneurshipData,
  fetchBusinessIdeas,
  fetchInnovationData,
  fetchMarketData,
  fetchAccountingFinanceData,
  fetchFormalizationData,
  fetchFinancingData,
  fetchTrainingData,
} from "@/utils/fetchPersonData";

export default async function PersonaPage({
  params,
}: {
  params: { id: string };
}) {
  const personaId = parseInt(params.id, 10);
  const personalInfo = await fetchPersonalInfo(personaId);
  const genderVariables = await fetchGenderVariables(personaId);
  const entrepreneurshipData = await fetchEntrepreneurshipData(personaId);

  const emprendimientoIds = entrepreneurshipData.map(
    (e: any) => e.id_emprendimiento
  );

  const businessIdeas = await fetchBusinessIdeas(emprendimientoIds);
  const innovationData = await fetchInnovationData(emprendimientoIds);
  const marketData = await fetchMarketData(emprendimientoIds);
  const accountingFinanceData = await fetchAccountingFinanceData(
    emprendimientoIds
  );
  const formalizationData = await fetchFormalizationData(emprendimientoIds);
  const financingData = await fetchFinancingData(emprendimientoIds);
  const trainingData = await fetchTrainingData(personaId);

  const personaCompleta = {
    personal_info: personalInfo,
    gender_variables: genderVariables,
    entrepreneurship: entrepreneurshipData,
    business_idea: businessIdeas,
    innovation: innovationData,
    market: marketData,
    accounting_finance: accountingFinanceData,
    formalization: formalizationData,
    financing: financingData,
    training: trainingData,
  };

  return <pre>{JSON.stringify(personaCompleta, null, 2)}</pre>;
}
