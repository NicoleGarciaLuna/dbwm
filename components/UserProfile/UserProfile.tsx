"use client";
import { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import TabButton from "./TabButton";
import Card from "../Card";
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

type TabType =
  | "personal"
  | "gender"
  | "emprendimiento"
  | "ideaNegocio"
  | "innovacion"
  | "mercado"
  | "contabilidadFinanzas"
  | "formalizacion"
  | "financiamiento"
  | "capacitacion";

const UserProfile = ({ personaId }: { personaId: number }) => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [personaCompleta, setPersonaCompleta] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
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

      setPersonaCompleta({
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
      });
    };

    fetchData();
  }, [personaId]);

  const tabs: Array<{ label: string; value: TabType }> = [
    { label: "Información personal", value: "personal" },
    { label: "Variables género", value: "gender" },
    { label: "Emprendimiento", value: "emprendimiento" },
    { label: "Idea negocio", value: "ideaNegocio" },
    { label: "Innovación", value: "innovacion" },
    { label: "Mercado", value: "mercado" },
    { label: "Contabilidad y finanzas", value: "contabilidadFinanzas" },
    { label: "Formalización", value: "formalizacion" },
    { label: "Financiamiento", value: "financiamiento" },
    { label: "Capacitación", value: "capacitacion" },
  ];

  if (!personaCompleta) {
    return <div>Cargando...</div>;
  }

  const { personal_info } = personaCompleta;

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        avatarSrc="/path/to/avatar.jpg"
        username={personal_info.nombre}
        joinedDate={personal_info.fecha_ingreso}
      />
      <div className="w-full max-w-6xl">
        <nav className="mb-6 overflow-x-auto">
          <ul className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4">
            {tabs.map((tab) => (
              <li key={tab.value}>
                <TabButton
                  label={tab.label}
                  isActive={activeTab === tab.value}
                  onClick={() => setActiveTab(tab.value)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6">
          {activeTab === "personal" && (
            <Card title="Información Personal">
              <pre>{JSON.stringify(personaCompleta.personal_info, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "gender" && (
            <Card title="Variables de Género">
              <pre>{JSON.stringify(personaCompleta.gender_variables, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "emprendimiento" && (
            <Card title="Emprendimiento">
              <pre>{JSON.stringify(personaCompleta.entrepreneurship, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "ideaNegocio" && (
            <Card title="Idea de Negocio">
              <pre>{JSON.stringify(personaCompleta.business_idea, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "innovacion" && (
            <Card title="Innovación">
              <pre>{JSON.stringify(personaCompleta.innovation, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "mercado" && (
            <Card title="Mercado">
              <pre>{JSON.stringify(personaCompleta.market, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "contabilidadFinanzas" && (
            <Card title="Contabilidad y Finanzas">
              <pre>{JSON.stringify(personaCompleta.accounting_finance, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "formalizacion" && (
            <Card title="Formalización">
              <pre>{JSON.stringify(personaCompleta.formalization, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "financiamiento" && (
            <Card title="Financiamiento">
              <pre>{JSON.stringify(personaCompleta.financing, null, 2)}</pre>
            </Card>
          )}
          {activeTab === "capacitacion" && (
            <Card title="Capacitación">
              <pre>{JSON.stringify(personaCompleta.training, null, 2)}</pre>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
