import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

const preload = () => {
  void getPersonaCompleta();
};

const fetchData = cache(
  async (
    supabase: any,
    table: string,
    column: string,
    value: any
  ): Promise<any[]> => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, value);
    if (error)
      throw new Error(`Error fetching data from ${table}: ${error.message}`);
    return data;
  }
);

const fetchMultipleRelatedData = cache(
  async (
    supabase: any,
    tables: string[],
    column: string,
    values: any[]
  ): Promise<Record<string, any[]>> => {
    const relatedData = await Promise.all(
      tables.map((table) =>
        Promise.all(
          values.map((value) => fetchData(supabase, table, column, value))
        )
      )
    );
    return tables.reduce((acc, table, index) => {
      acc[table] = relatedData[index];
      return acc;
    }, {} as Record<string, any[]>);
  }
);

// General function to fetch names for related data
const fetchNames = cache(
  async (
    supabase: any,
    table: string,
    ids: number[],
    idColumn: string,
    nameColumn: string
  ): Promise<Record<number, string>> => {
    const { data, error } = await supabase
      .from(table)
      .select(`${idColumn}, ${nameColumn}`)
      .in(idColumn, ids);
    if (error)
      throw new Error(`Error fetching names from ${table}: ${error.message}`);

    return data.reduce((acc: Record<number, string>, item: any) => {
      acc[item[idColumn]] = item[nameColumn];
      return acc;
    }, {});
  }
);

const getRelatedData = async (
  supabase: any,
  ids: number[],
  tables: string[],
  column: string
) => {
  return fetchMultipleRelatedData(supabase, tables, column, ids);
};

const mapDescription = (
  items: any[],
  nameMap: Record<number, string>,
  idKey: string
) => items.map((item) => ({ ...item, descripcion: nameMap[item[idKey]] }));

const getPersonaCompleta = cache(async (): Promise<any> => {
  const supabase = createClient();

  const config = {
    singleTables: [
      { table: "persona", column: "id_persona", value: 2 },
      { table: "variable_genero", column: "id_persona", value: 2 },
      { table: "capacitacion", column: "id_persona", value: 2 },
    ],
    multiTables: [
      "innovacion",
      "mercado",
      "contabilidad_finanzas",
      "financiamiento",
      "formalizacion",
      "idea_negocio",
      "producto",
    ],
    nestedTables: {
      mercado: [
        "mercado_red_social",
        "mercado_medio_venta",
        "mercado_cliente_actual",
      ],
      financiamiento: [
        "financiamiento_recurso_disponible",
        "financiamiento_origen_inversion_inicial",
        "financiamiento_fondo_programa_estado",
        "financiamiento_necesidad_financiamiento",
        "financiamiento_razon_no_credito",
      ],
      innovacion: [
        "innovacion_herramienta_metodologia",
        "innovacion_tipo_innovacion",
      ],
      formalizacion: ["formalizacion_aspecto_formalizacion"],
    },
    idColumnsMap: {
      mercado_red_social: "id_red_social",
      mercado_medio_venta: "id_medio_venta",
      mercado_cliente_actual: "id_cliente_actual",
      financiamiento_recurso_disponible: "id_recurso_disponible",
      financiamiento_origen_inversion_inicial: "id_origen_inversion_inicial",
      innovacion_herramienta_metodologia: "id_herramienta_metodologia",
      innovacion_tipo_innovacion: "id_tipo_innovacion",
      financiamiento_fondo_programa_estado: "id_fondo_programa_estado",
      financiamiento_necesidad_financiamiento: "id_necesidad_financiamiento",
      financiamiento_razon_no_credito: "id_razon_no_credito",
      formalizacion_aspecto_formalizacion: "id_aspecto_formalizacion",
    },
    nameColumnsMap: {
      mercado_red_social: "descripcion",
      mercado_medio_venta: "descripcion",
      mercado_cliente_actual: "descripcion",
      financiamiento_recurso_disponible: "descripcion",
      financiamiento_origen_inversion_inicial: "descripcion",
      innovacion_herramienta_metodologia: "descripcion",
      innovacion_tipo_innovacion: "descripcion",
      financiamiento_fondo_programa_estado: "descripcion",
      financiamiento_necesidad_financiamiento: "descripcion",
      financiamiento_razon_no_credito: "descripcion",
      formalizacion_aspecto_formalizacion: "descripcion",
    },
  };

  const singleData = await Promise.all(
    config.singleTables.map(({ table, column, value }) =>
      fetchData(supabase, table, column, value)
    )
  );

  const [persona, variableGenero, capacitaciones] = singleData;

  type Emprendimiento = {
    id_emprendimiento: number;
  };

  const emprendimientos = (await fetchData(
    supabase,
    "emprendimiento",
    "id_persona",
    2
  )) as Emprendimiento[];

  const relatedData = await fetchMultipleRelatedData(
    supabase,
    config.multiTables,
    "id_emprendimiento",
    emprendimientos.map((emp: Emprendimiento) => emp.id_emprendimiento)
  );

  const relatedIds = Object.keys(config.nestedTables).reduce((acc, key) => {
    acc[key] = relatedData[key]?.flat().map((item: any) => item[`id_${key}`]);
    return acc;
  }, {} as Record<string, number[]>);

  const nestedRelatedData = await Promise.all(
    Object.entries(config.nestedTables).map(([key, tables]) =>
      getRelatedData(supabase, relatedIds[key], tables, `id_${key}`)
    )
  );

  const nestedRelatedDataMap = Object.keys(config.nestedTables).reduce(
    (acc, key, index) => {
      acc[key] = nestedRelatedData[index];
      return acc;
    },
    {} as Record<string, Record<string, any[]>>
  );

  const nestedNamesData = await Promise.all(
    Object.entries(nestedRelatedDataMap).map(([key, data]) =>
      fetchNamesForTables(
        supabase,
        data,
        config.idColumnsMap,
        config.nameColumnsMap
      )
    )
  );

  const nestedNamesDataMap = Object.keys(nestedRelatedDataMap).reduce(
    (acc, key, index) => {
      acc[key] = nestedNamesData[index];
      return acc;
    },
    {} as Record<string, Record<string, Record<number, string>>>
  );

  const mapNestedData = (
    relatedData: Record<string, any[]>,
    namesData: Record<string, Record<number, string>>,
    key: string
  ) => {
    return relatedData[key].flat().map((item: any) => ({
      ...item,
      descripcion:
        namesData[key][
          item[config.idColumnsMap[key as keyof typeof config.idColumnsMap]]
        ],
    }));
  };

  const personaCompleta = {
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
    redesSociales: mapNestedData(
      nestedRelatedDataMap.mercado,
      nestedNamesDataMap.mercado,
      "mercado_red_social"
    ),
    mediosVenta: mapNestedData(
      nestedRelatedDataMap.mercado,
      nestedNamesDataMap.mercado,
      "mercado_medio_venta"
    ),
    clientesActuales: mapNestedData(
      nestedRelatedDataMap.mercado,
      nestedNamesDataMap.mercado,
      "mercado_cliente_actual"
    ),
    recursosDisponibles: mapNestedData(
      nestedRelatedDataMap.financiamiento,
      nestedNamesDataMap.financiamiento,
      "financiamiento_recurso_disponible"
    ),
    origenesInversionInicial: mapNestedData(
      nestedRelatedDataMap.financiamiento,
      nestedNamesDataMap.financiamiento,
      "financiamiento_origen_inversion_inicial"
    ),
    herramientasMetodologias: mapNestedData(
      nestedRelatedDataMap.innovacion,
      nestedNamesDataMap.innovacion,
      "innovacion_herramienta_metodologia"
    ),
    tipoInnovaciones: mapNestedData(
      nestedRelatedDataMap.innovacion,
      nestedNamesDataMap.innovacion,
      "innovacion_tipo_innovacion"
    ),
    fondoProgramaEstados: mapNestedData(
      nestedRelatedDataMap.financiamiento,
      nestedNamesDataMap.financiamiento,
      "financiamiento_fondo_programa_estado"
    ),
    necesidadesFinanciamiento: mapNestedData(
      nestedRelatedDataMap.financiamiento,
      nestedNamesDataMap.financiamiento,
      "financiamiento_necesidad_financiamiento"
    ),
    razonesNoCredito: mapNestedData(
      nestedRelatedDataMap.financiamiento,
      nestedNamesDataMap.financiamiento,
      "financiamiento_razon_no_credito"
    ),
    aspectosFormalizacion: mapNestedData(
      nestedRelatedDataMap.formalizacion,
      nestedNamesDataMap.formalizacion,
      "formalizacion_aspecto_formalizacion"
    ),
  };

  return personaCompleta;
});

const fetchNamesForTables = async (
  supabase: any,
  relatedData: Record<string, any[]>,
  idColumnsMap: Record<string, string>,
  nameColumnsMap: Record<string, string>
) => {
  const promises = Object.entries(relatedData).map(([table, data]) => {
    const ids = data.flat().map((item: any) => item[idColumnsMap[table]]);
    return fetchNames(
      supabase,
      table.split("_").slice(1).join("_"),
      ids,
      idColumnsMap[table],
      nameColumnsMap[table]
    );
  });
  const namesData = await Promise.all(promises);
  return Object.keys(relatedData).reduce((acc, table, index) => {
    acc[table] = namesData[index];
    return acc;
  }, {} as Record<string, Record<number, string>>);
};

const Persona = async () => {
  preload();

  const personaCompleta = await getPersonaCompleta();
  return <pre>{JSON.stringify(personaCompleta, null, 2)}</pre>;
};

export default Persona;
