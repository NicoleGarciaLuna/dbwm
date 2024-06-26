"use client";
import { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";
import { TabType, TabData } from "./types";
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

const UserProfile: React.FC<{ personaId: number }> = ({ personaId }) => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [tabsData, setTabsData] = useState<TabData>({
    personal: null,
    gender: null,
    emprendimiento: null,
    ideaNegocio: null,
    innovacion: null,
    mercado: null,
    contabilidadFinanzas: null,
    formalizacion: null,
    financiamiento: null,
    capacitacion: null,
  });
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [entrepreneurshipData, setEntrepreneurshipData] = useState<any>(null);

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

  useEffect(() => {
    const fetchPersonalInfoData = async () => {
      const info = await fetchPersonalInfo(personaId);
      setPersonalInfo(info);
      setTabsData(prev => ({ ...prev, personal: info }));
      setLoading(false);
    };

    const fetchEntrepreneurshipInfo = async () => {
      const data = await fetchEntrepreneurshipData(personaId);
      setEntrepreneurshipData(data);
      setTabsData(prev => ({ ...prev, emprendimiento: data }));
    };

    fetchPersonalInfoData();
    fetchEntrepreneurshipInfo();
  }, [personaId]);

  useEffect(() => {
    const fetchTabData = async () => {
      if (tabsData[activeTab] !== null) {
        setLoading(false);
        return;
      }

      setLoading(true);
      let data: any;
      switch (activeTab) {
        case "personal":
        case "emprendimiento":
          break;
        case "gender":
          data = await fetchGenderVariables(personaId);
          break;
        case "ideaNegocio":
          const emprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchBusinessIdeas(emprendimientoIds);
          break;
        case "innovacion":
          const innovationEmprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchInnovationData(innovationEmprendimientoIds);
          break;
        case "mercado":
          const marketEmprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchMarketData(marketEmprendimientoIds);
          break;
        case "contabilidadFinanzas":
          const accountingEmprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchAccountingFinanceData(accountingEmprendimientoIds);
          break;
        case "formalizacion":
          const formalizationEmprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchFormalizationData(formalizationEmprendimientoIds);
          break;
        case "financiamiento":
          const financingEmprendimientoIds = entrepreneurshipData.map((e: any) => e.id_emprendimiento);
          data = await fetchFinancingData(financingEmprendimientoIds);
          break;
        case "capacitacion":
          data = await fetchTrainingData(personaId);
          break;
        default:
          data = null;
          break;
      }
      setTabsData(prev => ({ ...prev, [activeTab]: data }));
      setLoading(false);
    };

    if (entrepreneurshipData || activeTab === "personal" || activeTab === "gender") {
      fetchTabData();
    }
  }, [activeTab, personaId, tabsData, entrepreneurshipData]);

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
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          <TabContent activeTab={activeTab} tabsData={tabsData} loading={loading} tabs={tabs} />
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
