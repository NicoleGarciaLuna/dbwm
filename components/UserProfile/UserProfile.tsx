"use client";
import { useState, useEffect, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);
  const [entrepreneurshipData, setEntrepreneurshipData] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [joinedDate, setJoinedDate] = useState<string>("");

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

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [personalInfo, data] = await Promise.all([
        fetchPersonalInfo(personaId),
        fetchEntrepreneurshipData(personaId),
      ]);
      setTabsData(prev => ({ ...prev, personal: personalInfo, emprendimiento: data }));
      setEntrepreneurshipData(data);
      
      if (personalInfo && personalInfo.length > 0) {
        const userInfo = personalInfo[0];
        const fullName = `${userInfo.nombre || ''} ${userInfo.primer_apellido || ''} ${userInfo.segundo_apellido || ''}`.trim();
        setUsername(fullName || 'Microempresaria');
        setJoinedDate(userInfo.fecha_diagnostico ? new Date(userInfo.fecha_diagnostico).toLocaleDateString() : 'Fecha de ingreso desconocida');
      } else {
        setUsername('Microempresaria');
        setJoinedDate('Fecha de ingreso desconocida');
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setUsername('Microempresaria');
      setJoinedDate('Fecha de ingreso desconocida');
    } finally {
      setLoading(false);
    }
  }, [personaId]);

  const fetchDataForTab = useCallback(async (tab: TabType, emprendimientoIds: number[]) => {
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
  }, []);

  const fetchTabData = useCallback(async () => {
    if (tabsData[activeTab] !== null) {
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
  }, [activeTab, entrepreneurshipData, fetchDataForTab, personaId, tabsData]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (entrepreneurshipData || activeTab === "personal" || activeTab === "gender") {
      fetchTabData();
    }
  }, [activeTab, entrepreneurshipData, fetchTabData]);

  if (loading && !username) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        username={username}
        joinedDate={joinedDate}
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
