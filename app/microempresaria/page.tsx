import { createClient } from "@/utils/supabase/server";
import {
  fetchData,
  fetchRelatedData,
  fetchNamesForTables,
  mapNestedData,
} from "@/utils/fetchUtils";
import { personaConfig } from "@/data/personaConfig";
import { cache } from "react";

const preload = () => {
  void getPersonaCompleta();
};

const getPersonaCompleta = cache(async (): Promise<any> => {
  const supabase = createClient();

  const singleData = await Promise.all(
    personaConfig.singleTables.map(({ table, column, value }) =>
      fetchData(supabase, table, column, value)
    )
  );

  const [persona, variableGenero, capacitaciones] = singleData;

  const emprendimientos = await fetchData(
    supabase,
    personaConfig.emprendimientoTable,
    personaConfig.emprendimientoColumn,
    personaConfig.personaId
  );

  const innovaciones = await fetchRelatedData(
    supabase,
    ["innovacion"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const mercados = await fetchRelatedData(
    supabase,
    ["mercado"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const mercadoRelatedIds = mercados["mercado"]
    ?.flat()
    .map((item: any) => item[`id_mercado`]);
  const mercadoNestedRelatedData = await fetchRelatedData(
    supabase,
    personaConfig.nestedTables.mercado,
    `id_mercado`,
    mercadoRelatedIds
  );
  const mercadoNestedNamesData = await fetchNamesForTables(
    supabase,
    mercadoNestedRelatedData,
    personaConfig.idColumnsMap,
    personaConfig.descriptionColumn
  );
  const mercadoNestedDataDescriptions = mapNestedData(
    mercadoNestedRelatedData,
    mercadoNestedNamesData,
    personaConfig.idColumnsMap
  );

  const contabilidadFinanzas = await fetchRelatedData(
    supabase,
    ["contabilidad_finanzas"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const financiamientos = await fetchRelatedData(
    supabase,
    ["financiamiento"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const financiamientoRelatedIds = financiamientos["financiamiento"]
    ?.flat()
    .map((item: any) => item[`id_financiamiento`]);
  const financiamientoNestedRelatedData = await fetchRelatedData(
    supabase,
    personaConfig.nestedTables.financiamiento,
    `id_financiamiento`,
    financiamientoRelatedIds
  );
  const financiamientoNestedNamesData = await fetchNamesForTables(
    supabase,
    financiamientoNestedRelatedData,
    personaConfig.idColumnsMap,
    personaConfig.descriptionColumn
  );
  const financiamientoNestedDataDescriptions = mapNestedData(
    financiamientoNestedRelatedData,
    financiamientoNestedNamesData,
    personaConfig.idColumnsMap
  );

  const formalizaciones = await fetchRelatedData(
    supabase,
    ["formalizacion"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const formalizacionRelatedIds = formalizaciones["formalizacion"]
    ?.flat()
    .map((item: any) => item[`id_formalizacion`]);
  const formalizacionNestedRelatedData = await fetchRelatedData(
    supabase,
    personaConfig.nestedTables.formalizacion,
    `id_formalizacion`,
    formalizacionRelatedIds
  );
  const formalizacionNestedNamesData = await fetchNamesForTables(
    supabase,
    formalizacionNestedRelatedData,
    personaConfig.idColumnsMap,
    personaConfig.descriptionColumn
  );
  const formalizacionNestedDataDescriptions = mapNestedData(
    formalizacionNestedRelatedData,
    formalizacionNestedNamesData,
    personaConfig.idColumnsMap
  );

  const ideasNegocio = await fetchRelatedData(
    supabase,
    ["idea_negocio"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const productos = await fetchRelatedData(
    supabase,
    ["producto"],
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: any) => emp.id_emprendimiento)
  );

  const buildPersonaCompleta = (
    persona: any[],
    variableGenero: any[],
    capacitaciones: any[],
    emprendimientos: any[],
    innovaciones: any,
    mercados: any,
    contabilidadFinanzas: any,
    financiamientos: any,
    formalizaciones: any,
    ideasNegocio: any,
    productos: any,
    mercadoNestedDataDescriptions: any,
    financiamientoNestedDataDescriptions: any,
    formalizacionNestedDataDescriptions: any
  ) => {
    return {
      persona: persona[0],
      emprendimientos,
      innovaciones: innovaciones["innovacion"].flat(),
      mercados: mercados["mercado"].flat(),
      ...mercadoNestedDataDescriptions,
      contabilidadFinanzas:
        contabilidadFinanzas["contabilidad_finanzas"].flat(),
      financiamientos: financiamientos["financiamiento"].flat(),
      ...financiamientoNestedDataDescriptions,
      formalizaciones: formalizaciones["formalizacion"].flat(),
      ...formalizacionNestedDataDescriptions,
      ideaNegocios: ideasNegocio["idea_negocio"].flat(),
      productos: productos["producto"].flat(),
      variableGenero: variableGenero[0],
      capacitaciones: capacitaciones[0],
    };
  };

  const personaCompleta = buildPersonaCompleta(
    persona,
    variableGenero,
    capacitaciones,
    emprendimientos,
    innovaciones,
    mercados,
    contabilidadFinanzas,
    financiamientos,
    formalizaciones,
    ideasNegocio,
    productos,
    mercadoNestedDataDescriptions,
    financiamientoNestedDataDescriptions,
    formalizacionNestedDataDescriptions
  );

  return personaCompleta;
});

const Persona = async () => {
  preload();

  const personaCompleta = await getPersonaCompleta();
  return <pre>{JSON.stringify(personaCompleta, null, 2)}</pre>;
};

export default Persona;
