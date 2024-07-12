"use client";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/LayoutComponent";
import TabsComponent from "@/components/TabsComponent";
import { categoryTabs } from "@/data/tabsConfig";
import dataService from "@/utils/api/dataService";

type DataItem = {
  name: string;
  value: number;
};

type DataState = Record<string, DataItem[] | null>;

const endpoints = {
  personal: [
    {
      key: "maritalStatusData",
      table: "info_personal",
      select: "estado_civil, estado_civil.count()",
    },
    {
      key: "educationData",
      table: "info_personal",
      select: "escolaridad, escolaridad.count()",
    },
  ],
  gender: [
    {
      key: "householdTasksTimeData",
      table: "variable_genero",
      select: "tiempo_tareas_hogar, tiempo_tareas_hogar.count()",
    },
    {
      key: "householdUtilityPercentageData",
      table: "variable_genero",
      select: "porcentaje_utilidad_hogar, porcentaje_utilidad_hogar.count()",
    },
    {
      key: "dependentsData",
      table: "variable_genero",
      select: "personas_a_cargo, personas_a_cargo.count()",
    },
    {
      key: "entrepreneurshipAutonomyData",
      table: "variable_genero",
      select: "id_autonomia_emprendimiento.count()",
    },
  ],
  emprendimiento: [
    {
      key: "businessTypeData",
      table: "emprendimiento",
      select: "tipo_emprendimiento, tipo_emprendimiento.count()",
    },
    {
      key: "operationTimeData",
      table: "emprendimiento",
      select: "tiempo_operacion, tiempo_operacion.count()",
    },
    {
      key: "economicSectorData",
      table: "emprendimiento",
      select: "sector_economico, sector_economico.count()",
    },
    {
      key: "businessStageData",
      table: "emprendimiento",
      select: "etapa_evolucion, etapa_evolucion.count()",
    },
    {
      key: "siecRegistrationData",
      table: "emprendimiento",
      select: "registro_siec, registro_siec.count()",
    },
  ],
  ideaNegocio: [
    {
      key: "businessIdeaStatusData",
      table: "idea_negocio",
      select: "estado_idea, estado_idea.count()",
    },
    {
      key: "developedInstrumentsData",
      table: "idea_negocio",
      select: "instrumentos_desarrollados, instrumentos_desarrollados.count()",
    },
  ],
  innovacion: [
    {
      key: "ticsUsageData",
      table: "innovacion",
      select: "uso_tics, uso_tics.count()",
    },
    {
      key: "intellectualPropertyRegistrationData",
      table: "innovacion",
      select:
        "registro_propiedad_intelectual, registro_propiedad_intelectual.count()",
    },
  ],
  mercado: [
    {
      key: "digitalMarketingStrategyData",
      table: "mercado",
      select:
        "estrategia_mercadeo_digital, estrategia_mercadeo_digital.count()",
    },
    {
      key: "monthlySalesAverageData",
      table: "mercado",
      select: "promedio_mensual_ventas, promedio_mensual_ventas.count()",
    },
    {
      key: "identifiedCompetitorsData",
      table: "mercado",
      select: "competidores_identificados, competidores_identificados.count()",
    },
    {
      key: "targetMarketData",
      table: "mercado",
      select: "mercado_objetivo, mercado_objetivo.count()",
    },
    {
      key: "segmentedMarketData",
      table: "mercado",
      select: "mercado_segmentado, mercado_segmentado.count()",
    },
    {
      key: "brandImageData",
      table: "mercado",
      select: "marca_imagen_grafica, marca_imagen_grafica.count()",
    },
    {
      key: "currentClientsData",
      table: "mercado",
      select: "id_cliente_actual.count()",
    },
    {
      key: "salesChannelsData",
      table: "mercado",
      select: "id_medio_venta.count()",
    },
  ],
  contabilidadFinanzas: [
    {
      key: "monthlyBaseSalaryData",
      table: "contabilidad_finanzas",
      select: "salario_base_mensual, salario_base_mensual.count()",
    },
    {
      key: "annualBudgetData",
      table: "contabilidad_finanzas",
      select: "presupuesto_anual, presupuesto_anual.count()",
    },
    {
      key: "inventoryControlData",
      table: "contabilidad_finanzas",
      select: "control_inventario, control_inventario.count()",
    },
  ],
  formalizacion: [
    {
      key: "formalizationInterestData",
      table: "formalizacion",
      select: "interes_formalizar, interes_formalizar.count()",
    },
    {
      key: "formalizationStepsKnowledgeData",
      table: "formalizacion",
      select: "conocimiento_pasos, conocimiento_pasos.count()",
    },
    {
      key: "formalizationAspectsData",
      table: "formalizacion",
      select: "id_aspecto_formalizacion.count()",
    },
  ],
  financiamiento: [
    {
      key: "activeCreditData",
      table: "financiamiento",
      select: "credito_activo, credito_activo.count()",
    },
    {
      key: "currentCreditOperationsData",
      table: "financiamiento",
      select:
        "operaciones_crediticias_al_dia, operaciones_crediticias_al_dia.count()",
    },
    {
      key: "stateProgramFundsData",
      table: "financiamiento",
      select: "id_fondo_programa_estado.count()",
    },
    {
      key: "financingNeedsData",
      table: "financiamiento",
      select: "id_necesidad_financiamiento.count()",
    },
    {
      key: "noCreditReasonsData",
      table: "financiamiento",
      select: "id_razon_no_credito.count()",
    },
    {
      key: "availableResourcesData",
      table: "financiamiento",
      select: "id_recurso_disponible.count()",
    },
    {
      key: "initialInvestmentSourceData",
      table: "financiamiento",
      select: "id_origen_inversion_inicial.count()",
    },
  ],
};

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataState>({});
  const [activeTab, setActiveTab] = useState<string>(categoryTabs[0].value);

  const fetchStatisticsData = useCallback(
    async (tab: string) => {
      if (data[tab]) return;

      setLoading(true);
      const newData: DataState = {};
      for (const endpoint of endpoints[tab]) {
        newData[endpoint.key] = await dataService.fetchStatistics(
          endpoint.table,
          endpoint.select
        );
      }
      setData((prevData) => ({ ...prevData, [tab]: newData }));
      setLoading(false);
    },
    [data]
  );

  useEffect(() => {
    fetchStatisticsData(activeTab);
  }, [activeTab, fetchStatisticsData]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const filteredTabs = categoryTabs.slice(0, -1);

  return (
    <Layout>
      <TabsComponent
        loading={loading}
        tabs={filteredTabs}
        data={data}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
    </Layout>
  );
};

export default Statistics;
