import { useState, useEffect, useCallback, useMemo } from "react";
import { supabaseClient } from "@/shared/utils/supabase/client";
import { USER_PROFILE_CATEGORY_TABS } from "@/shared/config";

export type TabData = Record<string, any>;

const fetchDataByTab = async (tab: string, personaId: number) => {
  switch (tab) {
    case "personal":
      return supabaseClient
        .from("persona")
        .select(
          `
          *,
          diagnostico (
            fecha_diagnostico,
            info_personal (
              *,
              info_personal_fuente_ingreso (
                fuente_ingreso (
                  descripcion
                )
              )
            )
          )
        `
        )
        .eq("id_persona", personaId)
        .single();
    case "gender":
      return supabaseClient
        .from("variable_genero")
        .select(
          `
          *,
          variable_genero_autonomia_emprendimiento (
            autonomia_emprendimiento (
              descripcion
            )
          ),
          variable_genero_encargado_tareas_hogar (
            encargado_tareas_hogar (
              descripcion
            )
          ),
          variable_genero_tipo_cuido (
            tipo_cuido (
              descripcion
            )
          )
        `
        )
        .eq("id_diagnostico", personaId);
    case "emprendimiento":
      return supabaseClient
        .from("emprendimiento")
        .select("*")
        .eq("id_diagnostico", personaId);
    case "ideaNegocio":
      return supabaseClient
        .from("idea_negocio")
        .select("*")
        .eq("id_diagnostico", personaId);
    case "innovacion":
      return supabaseClient
        .from("innovacion")
        .select(
          `
          *,
          innovacion_herramienta_metodologia (
            herramienta_metodologia (
              descripcion
            )
          ),
          innovacion_inversion_idi (
            inversion_idi (
              descripcion
            )
          ),
          innovacion_tipo_innovacion (
            tipo_innovacion (
              descripcion
            )
          )
        `
        )
        .eq("id_diagnostico", personaId);
    case "mercado":
      return supabaseClient
        .from("mercado")
        .select(
          `
          *,
          mercado_cliente_actual (
            cliente_actual (
              descripcion
            )
          ),
          mercado_medio_venta (
            medio_venta (
              descripcion
            )
          ),
          mercado_red_social (
            red_social (
              descripcion
            )
          )
        `
        )
        .eq("id_diagnostico", personaId);
    case "contabilidadFinanzas":
      return supabaseClient
        .from("contabilidad_finanzas")
        .select("*")
        .eq("id_diagnostico", personaId);
    case "formalizacion":
      return supabaseClient
        .from("formalizacion")
        .select(
          `
          *,
          formalizacion_aspecto_formalizacion (
            aspecto_formalizacion (
              descripcion
            )
          )
        `
        )
        .eq("id_diagnostico", personaId);
    case "financiamiento":
      return supabaseClient
        .from("financiamiento")
        .select(
          `
          *,
          financiamiento_fondo_programa_estado (
            fondo_programa_estado (
              descripcion
            )
          ),
          financiamiento_necesidad_financiamiento (
            necesidad_financiamiento (
              descripcion
            )
          ),
          financiamiento_origen_inversion_inicial (
            origen_inversion_inicial (
              descripcion
            )
          ),
          financiamiento_razon_no_credito (
            razon_no_credito (
              descripcion
            )
          ),
          financiamiento_recurso_disponible (
            recurso_disponible (
              descripcion
            )
          )
        `
        )
        .eq("id_diagnostico", personaId);
    case "capacitacion":
      return supabaseClient
        .from("capacitacion")
        .select("*")
        .eq("id_persona", personaId);
    default:
      throw new Error("Invalid tab");
  }
};

export const useUserProfileData = (personaId: number) => {
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [tabsData, setTabsData] = useState<TabData>({} as TabData);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [joinedDate, setJoinedDate] = useState("");

  const fetchTabData = useCallback(
    async (tab: string) => {
      setLoading(true);
      try {
        const { data, error } = await fetchDataByTab(tab, personaId);
        if (error) {
          console.error(error);
          return;
        }

        if (tab === "personal" && data) {
          setUsername(`${data.nombre} ${data.primer_apellido}`);
          setJoinedDate(data.diagnostico?.[0]?.fecha_diagnostico || "");
        }

        setTabsData((prevData) => ({
          ...prevData,
          [tab]: data,
        }));
      } finally {
        setLoading(false);
      }
    },
    [personaId]
  );

  useEffect(() => {
    fetchTabData("personal");
  }, [personaId, fetchTabData]);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    if (!tabsData[tab]) {
      fetchTabData(tab);
    }
  };

  const memoizedTabsConfig = useMemo(() => USER_PROFILE_CATEGORY_TABS, []);

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    tabsData,
    loading,
    username,
    joinedDate,
    tabs: memoizedTabsConfig,
  };
};
