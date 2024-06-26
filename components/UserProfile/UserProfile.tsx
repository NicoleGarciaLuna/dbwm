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

type UserProfileProps = {
  personaId: number;
  avatarSrc: string;
};

const UserProfile = ({ personaId, avatarSrc }: UserProfileProps) => {
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
  const [loading, setLoading] = useState(true);
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

  const fetchInitialData = async () => {
    try {
      const [info, data] = await Promise.all([
        fetchPersonalInfo(personaId),
        fetchEntrepreneurshipData(personaId),
      ]);
      setPersonalInfo(info);
      setEntrepreneurshipData(data);
      setTabsData(prev => ({ ...prev, personal: info, emprendimiento: data }));
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTabData = async () => {
    if (tabsData[activeTab] !== null) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let data: any;
      switch (activeTab) {
        case "personal":
        case "emprendimiento":
          break;
        case "gender":
          data = await fetchGenderVariables(personaId);
          break;
        case "ideaNegocio":
        case "innovacion":
        case "mercado":
        case "contabilidadFinanzas":
        case "formalizacion":
        case "financiamiento":
          const emprendimientoIds = entrepreneurshipData?.map((e: any) => e.id_emprendimiento) ?? [];
          data = await fetchDataForTab(activeTab, emprendimientoIds);
          break;
        case "capacitacion":
          data = await fetchTrainingData(personaId);
          break;
        default:
          data = null;
          break;
      }
      setTabsData(prev => ({ ...prev, [activeTab]: data }));
    } catch (error) {
      console.error(`Error fetching data for ${activeTab} tab:`, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataForTab = async (tab: TabType, emprendimientoIds: number[]) => {
    switch (tab) {
      case "ideaNegocio":
        return await fetchBusinessIdeas(emprendimientoIds);
      case "innovacion":
        return await fetchInnovationData(emprendimientoIds);
      case "mercado":
        return await fetchMarketData(emprendimientoIds);
      case "contabilidadFinanzas":
        return await fetchAccountingFinanceData(emprendimientoIds);
      case "formalizacion":
        return await fetchFormalizationData(emprendimientoIds);
      case "financiamiento":
        return await fetchFinancingData(emprendimientoIds);
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [personaId]);

  useEffect(() => {
    if (entrepreneurshipData || activeTab === "personal" || activeTab === "gender") {
      fetchTabData();
    }
  }, [activeTab, personaId, entrepreneurshipData]);

  if (loading && !personalInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        username={`${personalInfo?.nombre} ${personalInfo?.primer_apellido} ${personalInfo?.segundo_apellido}`}
        joinedDate={personalInfo?.fecha_ingreso}
        avatarSrc={avatarSrc}
      />
      <div className="w-full max-w-6xl">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-6">
          <TabContent
            activeTab={activeTab}
            tabsData={tabsData}
            loading={loading}
            tabs={tabs}
          />
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
