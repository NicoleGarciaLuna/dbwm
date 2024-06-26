import { useState, useEffect, useCallback } from "react";
import { TabType, TabData } from "@/components/UserProfile/types";

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

export const useUserProfileData = (
  personaId: number,
  dataFetchingFunctions: DataFetchingFunctions
) => {
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
        dataFetchingFunctions.fetchPersonalInfo(personaId),
        dataFetchingFunctions.fetchEntrepreneurshipData(personaId),
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
  }, [personaId, dataFetchingFunctions]);

  const fetchDataForTab = useCallback(
    async (tab: TabType, emprendimientoIds: number[]) => {
      switch (tab) {
        case "ideaNegocio":
          return await dataFetchingFunctions.fetchBusinessIdeas(
            emprendimientoIds
          );
        case "innovacion":
          return await dataFetchingFunctions.fetchInnovationData(
            emprendimientoIds
          );
        case "mercado":
          return await dataFetchingFunctions.fetchMarketData(emprendimientoIds);
        case "contabilidadFinanzas":
          return await dataFetchingFunctions.fetchAccountingFinanceData(
            emprendimientoIds
          );
        case "formalizacion":
          return await dataFetchingFunctions.fetchFormalizationData(
            emprendimientoIds
          );
        case "financiamiento":
          return await dataFetchingFunctions.fetchFinancingData(
            emprendimientoIds
          );
        default:
          return null;
      }
    },
    [dataFetchingFunctions]
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
          data = await dataFetchingFunctions.fetchGenderVariables(personaId);
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
          data = await dataFetchingFunctions.fetchTrainingData(personaId);
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
  }, [
    activeTab,
    entrepreneurshipData,
    fetchDataForTab,
    personaId,
    tabsData,
    dataFetchingFunctions,
  ]);

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
