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
  const [tabData, setTabData] = useState<any>(null);
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonalInfoData = async () => {
      const info = await fetchPersonalInfo(personaId);
      setPersonalInfo(info);
      setLoading(false);
    };

    fetchPersonalInfoData();
  }, [personaId]);

  useEffect(() => {
    const fetchTabData = async () => {
      setLoading(true);
      let data;
      switch (activeTab) {
        case "personal":
          data = await fetchPersonalInfo(personaId);
          break;
        case "gender":
          data = await fetchGenderVariables(personaId);
          break;
        case "emprendimiento":
          data = await fetchEntrepreneurshipData(personaId);
          break;
        case "ideaNegocio":
          const entrepreneurshipData = await fetchEntrepreneurshipData(personaId);
          const emprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchBusinessIdeas(emprendimientoIds);
          break;
        case "innovacion":
          const innovationEntrepreneurshipData = await fetchEntrepreneurshipData(personaId);
          const innovationEmprendimientoIds = innovationEntrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchInnovationData(innovationEmprendimientoIds);
          break;
        case "mercado":
          const marketEntrepreneurshipData = await fetchEntrepreneurshipData(personaId);
          const marketEmprendimientoIds = marketEntrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchMarketData(marketEmprendimientoIds);
          break;
        case "contabilidadFinanzas":
          const accountingEntrepreneurshipData = await fetchEntrepreneurshipData(personaId);
          const accountingEmprendimientoIds = accountingEntrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchAccountingFinanceData(accountingEmprendimientoIds);
          break;
        case "formalizacion":
          const formalizationEntrepreneurshipData = await fetchEntrepreneurshipData(personaId);
          const formalizationEmprendimientoIds = formalizationEntrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchFormalizationData(formalizationEmprendimientoIds);
          break;
        case "financiamiento":
          const financingEntrepreneurshipData = await fetchEntrepreneurshipData(personaId);
          const financingEmprendimientoIds = financingEntrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchFinancingData(financingEmprendimientoIds);
          break;
        case "capacitacion":
          data = await fetchTrainingData(personaId);
          break;
      }
      setTabData(data);
      setLoading(false);
    };

    fetchTabData();
  }, [activeTab, personaId]);

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

  if (loading && !personalInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        avatarSrc="/path/to/avatar.jpg"
        username={personalInfo?.nombre}
        joinedDate={personalInfo?.fecha_ingreso}
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
          {loading ? (
            <div>Cargando datos...</div>
          ) : (
            <Card title={tabs.find(tab => tab.value === activeTab)?.label || ""}>
              <pre>{JSON.stringify(tabData, null, 2)}</pre>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
