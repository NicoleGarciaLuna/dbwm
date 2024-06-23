import { createClient } from "@/utils/supabase/server";
import {
  fetchData,
  fetchMultipleRelatedData,
  getRelatedData,
  fetchNamesForTables,
  buildNestedDataDescriptions,
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

  type Emprendimiento = {
    id_emprendimiento: number;
  };

  const emprendimientos = (await fetchData(
    supabase,
    personaConfig.emprendimientoTable,
    personaConfig.emprendimientoColumn,
    personaConfig.personaId
  )) as Emprendimiento[];

  const relatedData = await fetchMultipleRelatedData(
    supabase,
    personaConfig.multiTables,
    personaConfig.relatedDataColumn,
    emprendimientos.map((emp: Emprendimiento) => emp.id_emprendimiento)
  );

  const relatedIds = personaConfig.nestedRelatedDataKeys.reduce((acc, key) => {
    acc[key] = relatedData[key]?.flat().map((item: any) => item[`id_${key}`]);
    return acc;
  }, {} as Record<string, number[]>);

  const nestedRelatedData = await Promise.all(
    Object.entries(personaConfig.nestedTables).map(([key, tables]) =>
      getRelatedData(supabase, relatedIds[key], tables, `id_${key}`)
    )
  );

  const nestedRelatedDataMap = personaConfig.nestedRelatedDataKeys.reduce(
    (acc, key, index) => {
      acc[key] = nestedRelatedData[index];
      return acc;
    },
    {} as Record<string, Record<string, any[]>>
  );

  const nestedNamesData = await Promise.all(
    Object.entries(nestedRelatedDataMap).map(([key, data]) =>
      fetchNamesForTables(supabase, data, personaConfig.idColumnsMap)
    )
  );

  const nestedNamesDataMap = personaConfig.nestedRelatedDataKeys.reduce(
    (acc, key, index) => {
      acc[key] = nestedNamesData[index];
      return acc;
    },
    {} as Record<string, Record<string, Record<number, string>>>
  );

  const nestedDataDescriptions = buildNestedDataDescriptions(
    nestedRelatedDataMap,
    nestedNamesDataMap
  );

  const buildPersonaCompleta = (
    persona: any[],
    variableGenero: any[],
    capacitaciones: any[],
    emprendimientos: any[],
    relatedData: Record<string, any[]>,
    nestedDataDescriptions: Record<string, any[]>
  ) => {
    return {
      persona: persona[0],
      emprendimientos,
      innovaciones: relatedData["innovacion"].flat(),
      mercados: relatedData["mercado"].flat(),
      contabilidadFinanzas: relatedData["contabilidad_finanzas"].flat(),
      financiamientos: relatedData["financiamiento"].flat(),
      formalizaciones: relatedData["formalizacion"].flat(),
      ideaNegocios: relatedData["idea_negocio"].flat(),
      productos: relatedData["producto"].flat(),
      variableGenero: variableGenero[0],
      capacitaciones: capacitaciones[0],
      ...nestedDataDescriptions,
    };
  };

  const personaCompleta = buildPersonaCompleta(
    persona,
    variableGenero,
    capacitaciones,
    emprendimientos,
    relatedData,
    nestedDataDescriptions
  );

  return personaCompleta;
});

const Persona = async () => {
  preload();

  const personaCompleta = await getPersonaCompleta();
  return <pre>{JSON.stringify(personaCompleta, null, 2)}</pre>;
};

export default Persona;
