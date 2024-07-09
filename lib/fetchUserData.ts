import { supabase } from "@/utils/api/supabaseClient";

export type TabType =
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

export type TabData = Record<TabType, any>;

export const tabsConfig: Array<{ label: string; value: TabType }> = [
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

const fetchDataByTab = async (tab: TabType, personaId: number) => {
  switch (tab) {
    case "personal":
      return supabase
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
      return supabase
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
      return supabase
        .from("emprendimiento")
        .select("*")
        .eq("id_diagnostico", personaId);
    case "ideaNegocio":
      return supabase
        .from("idea_negocio")
        .select("*")
        .eq("id_diagnostico", personaId);
    case "innovacion":
      return supabase
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
      return supabase
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
      return supabase
        .from("contabilidad_finanzas")
        .select("*")
        .eq("id_diagnostico", personaId);
    case "formalizacion":
      return supabase
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
      return supabase
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
      return supabase
        .from("capacitacion")
        .select("*")
        .eq("id_persona", personaId);
    default:
      throw new Error("Invalid tab");
  }
};

export const fetchUserProfileData = async (personaId: number) => {
  const personalData = fetchDataByTab("personal", personaId);
  const genderData = fetchDataByTab("gender", personaId);
  const emprendimientoData = fetchDataByTab("emprendimiento", personaId);
  const ideaNegocioData = fetchDataByTab("ideaNegocio", personaId);
  const innovacionData = fetchDataByTab("innovacion", personaId);
  const mercadoData = fetchDataByTab("mercado", personaId);
  const contabilidadFinanzasData = fetchDataByTab(
    "contabilidadFinanzas",
    personaId
  );
  const formalizacionData = fetchDataByTab("formalizacion", personaId);
  const financiamientoData = fetchDataByTab("financiamiento", personaId);
  const capacitacionData = fetchDataByTab("capacitacion", personaId);

  const [
    personal,
    gender,
    emprendimiento,
    ideaNegocio,
    innovacion,
    mercado,
    contabilidadFinanzas,
    formalizacion,
    financiamiento,
    capacitacion,
  ] = await Promise.all([
    personalData,
    genderData,
    emprendimientoData,
    ideaNegocioData,
    innovacionData,
    mercadoData,
    contabilidadFinanzasData,
    formalizacionData,
    financiamientoData,
    capacitacionData,
  ]);

  return {
    personal: personal.data,
    gender: gender.data,
    emprendimiento: emprendimiento.data,
    ideaNegocio: ideaNegocio.data,
    innovacion: innovacion.data,
    mercado: mercado.data,
    contabilidadFinanzas: contabilidadFinanzas.data,
    formalizacion: formalizacion.data,
    financiamiento: financiamiento.data,
    capacitacion: capacitacion.data,
  };
};
