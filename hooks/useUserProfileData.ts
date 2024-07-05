import { useState, useEffect, useCallback } from "react";
import { TabType, TabData } from "@/components/UserProfile/types";
import * as fetchPersonData from "@/utils/dataFetching/fetchPersonData";
import * as fetchGenderData from "@/utils/dataFetching/fetchGenderData";
import * as fetchEntrepreneurshipData from "@/utils/dataFetching/fetchEntrepreneurshipData";
import * as fetchBusinessIdeasData from "@/utils/dataFetching/fetchBusinessIdeasData";
import * as fetchInnovationData from "@/utils/dataFetching/fetchInnovationData";
import * as fetchMarketData from "@/utils/dataFetching/fetchMarketData";
import * as fetchAccountingFinanceData from "@/utils/dataFetching/fetchAccountingFinanceData";
import * as fetchFormalizationData from "@/utils/dataFetching/fetchFormalizationData";
import * as fetchFinancingData from "@/utils/dataFetching/fetchFinancingData";
import * as fetchTrainingData from "@/utils/dataFetching/fetchTrainingData";

type FetchFunction = (id: number) => Promise<any>;
type FetchFunctionWithIds = (ids: number[]) => Promise<any>;

interface DataFetchingFunctions {
  fetchPersonalInfo: FetchFunction;
  fetchGenderVariables: FetchFunction;
  fetchEntrepreneurshipData: FetchFunction;
  fetchBusinessIdeas: FetchFunctionWithIds;
  fetchInnovationData: FetchFunctionWithIds;
  fetchMarketData: FetchFunctionWithIds;
  fetchAccountingFinanceData: FetchFunctionWithIds;
  fetchFormalizationData: FetchFunctionWithIds;
  fetchFinancingData: FetchFunctionWithIds;
  fetchTrainingData: FetchFunction;
}

export const useUserProfileData = (personaId: number) => {
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

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [personalInfo, data] = await Promise.all([
        fetchPersonData.fetchPersonalInfo(personaId),
        fetchEntrepreneurshipData.fetchEntrepreneurshipData(personaId),
      ]);
      setTabsData((prev) => ({
        ...prev,
        personal: personalInfo,
        emprendimiento: data,
      }));
      setEntrepreneurshipData(data);

      if (personalInfo && personalInfo.length > 0) {
        const userInfo = personalInfo[0];
        const fullName = `${userInfo.nombre || ""} ${
          userInfo.primer_apellido || ""
        } ${userInfo.segundo_apellido || ""}`.trim();
        setUsername(fullName || "Microempresaria");
        setJoinedDate(
          userInfo.fecha_diagnostico
            ? new Date(userInfo.fecha_diagnostico).toLocaleDateString()
            : "Fecha de ingreso desconocida"
        );
      } else {
        setUsername("Microempresaria");
        setJoinedDate("Fecha de ingreso desconocida");
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setUsername("Microempresaria");
      setJoinedDate("Fecha de ingreso desconocida");
    } finally {
      setLoading(false);
    }
  }, [personaId]);

  const fetchDataForTab = useCallback(
    async (tab: TabType, emprendimientoIds: number[]) => {
      switch (tab) {
        case "ideaNegocio":
          return await fetchBusinessIdeasData.fetchBusinessIdeas(
            emprendimientoIds
          );
        case "innovacion":
          return await fetchInnovationData.fetchInnovationData(
            emprendimientoIds
          );
        case "mercado":
          return await fetchMarketData.fetchMarketData(emprendimientoIds);
        case "contabilidadFinanzas":
          return await fetchAccountingFinanceData.fetchAccountingFinanceData(
            emprendimientoIds
          );
        case "formalizacion":
          return await fetchFormalizationData.fetchFormalizationData(
            emprendimientoIds
          );
        case "financiamiento":
          return await fetchFinancingData.fetchFinancingData(emprendimientoIds);
        default:
          return null;
      }
    },
    []
  );

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
          data = await fetchGenderData.fetchGenderVariables(personaId);
          break;
        case "ideaNegocio":
        case "innovacion":
        case "mercado":
        case "contabilidadFinanzas":
        case "formalizacion":
        case "financiamiento":
          const emprendimientoIds =
            entrepreneurshipData?.map((e: any) => e.id_emprendimiento) ?? [];
          data = await fetchDataForTab(activeTab, emprendimientoIds);
          break;
        case "capacitacion":
          data = await fetchTrainingData.fetchTrainingData(personaId);
          break;
        default:
          data = null;
          break;
      }
      setTabsData((prev) => ({ ...prev, [activeTab]: data }));
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
    if (
      entrepreneurshipData ||
      activeTab === "personal" ||
      activeTab === "gender"
    ) {
      fetchTabData();
    }
  }, [activeTab, entrepreneurshipData, fetchTabData]);

  return {
    activeTab,
    setActiveTab,
    tabsData,
    loading,
    username,
    joinedDate,
  };
};
