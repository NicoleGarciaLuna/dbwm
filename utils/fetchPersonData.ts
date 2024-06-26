import { fetchData, fetchNestedDataWithNames, fetchAndAddRelatedNames } from "@/utils/fetchUtils";

export const fetchPersonalInfo = async (personaId: number) => {
  const [persona] = await fetchData("persona", "id_persona", personaId);
  return persona;
};

export const fetchGenderVariables = async (personaId: number) => {
  return await fetchData("variable_genero", "id_genero", personaId);
};

export const fetchEntrepreneurshipData = async (personaId: number) => {
  return await fetchData("emprendimiento", "id_persona", personaId);
};

export const fetchBusinessIdeas = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "idea_negocio", foreignKey: "id_emprendimiento" }
  ]);
};

export const fetchInnovationData = async (emprendimientoIds: number[]) => {
  const innovationRelations = [
    { name: "innovacion", foreignKey: "id_emprendimiento" },
    { name: "innovacion_inversion_idi", foreignKey: "id_innovacion", relatedTable: "inversion_idi", relatedKey: "id_inversion_idi", targetColumn: "descripcion" },
    { name: "innovacion_herramienta_metodologia", foreignKey: "id_innovacion", relatedTable: "herramienta_metodologia", relatedKey: "id_herramienta_metodologia", targetColumn: "descripcion" },
    { name: "innovacion_tipo_innovacion", foreignKey: "id_innovacion", relatedTable: "tipo_innovacion", relatedKey: "id_tipo_innovacion", targetColumn: "descripcion" }
  ];
  return await fetchNestedDataWithNames(emprendimientoIds, innovationRelations);
};

export const fetchMarketData = async (emprendimientoIds: number[]) => {
  const marketRelations = [
    { name: "mercado", foreignKey: "id_emprendimiento" },
    { name: "mercado_red_social", foreignKey: "id_mercado" },
    { name: "mercado_medio_venta", foreignKey: "id_mercado" },
    { name: "mercado_cliente_actual", foreignKey: "id_mercado" }
  ];
  const nestedData = await fetchNestedDataWithNames(emprendimientoIds, marketRelations);

  const relatedDataToFetch = [
    { key: "mercado_red_social", table: "red_social", idColumn: "id_red_social", descColumn: "descripcion" },
    { key: "mercado_medio_venta", table: "medio_venta", idColumn: "id_medio_venta", descColumn: "descripcion" },
    { key: "mercado_cliente_actual", table: "cliente_actual", idColumn: "id_cliente_actual", descColumn: "descripcion" }
  ];

  for (const { key, table, idColumn, descColumn } of relatedDataToFetch) {
    nestedData[key] = await fetchAndAddRelatedNames(
      nestedData[key],
      table,
      idColumn,
      descColumn,
      idColumn
    );
  }

  return nestedData;
};

export const fetchAccountingFinanceData = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "contabilidad_finanzas", foreignKey: "id_emprendimiento" }
  ]);
};

export const fetchFormalizationData = async (emprendimientoIds: number[]) => {
  const formalizationRelations = [
    { name: "formalizacion", foreignKey: "id_emprendimiento" },
    { name: "formalizacion_aspecto_formalizacion", foreignKey: "id_formalizacion" }
  ];
  const nestedData = await fetchNestedDataWithNames(emprendimientoIds, formalizationRelations);

  nestedData["formalizacion_aspecto_formalizacion"] = await fetchAndAddRelatedNames(
    nestedData["formalizacion_aspecto_formalizacion"],
    "aspecto_formalizacion",
    "id_aspecto_formalizacion",
    "descripcion",
    "id_aspecto_formalizacion"
  );

  return nestedData;
};

export const fetchFinancingData = async (emprendimientoIds: number[]) => {
  const financingRelations = [
    { name: "financiamiento", foreignKey: "id_emprendimiento" },
    { name: "financiamiento_fondo_programa_estado", foreignKey: "id_financiamiento" },
    { name: "financiamiento_necesidad_financiamiento", foreignKey: "id_financiamiento" },
    { name: "financiamiento_razon_no_credito", foreignKey: "id_financiamiento" },
    { name: "financiamiento_recurso_disponible", foreignKey: "id_financiamiento" },
    { name: "financiamiento_origen_inversion_inicial", foreignKey: "id_financiamiento" }
  ];
  const nestedData = await fetchNestedDataWithNames(emprendimientoIds, financingRelations);

  const relatedDataToFetch = [
    { key: "financiamiento_fondo_programa_estado", table: "fondo_programa_estado", idColumn: "id_fondo_programa_estado" },
    { key: "financiamiento_necesidad_financiamiento", table: "necesidad_financiamiento", idColumn: "id_necesidad_financiamiento" },
    { key: "financiamiento_razon_no_credito", table: "razon_no_credito", idColumn: "id_razon_no_credito" },
    { key: "financiamiento_recurso_disponible", table: "recurso_disponible", idColumn: "id_recurso_disponible" },
    { key: "financiamiento_origen_inversion_inicial", table: "origen_inversion_inicial", idColumn: "id_origen_inversion_inicial" }
  ];

  for (const { key, table, idColumn } of relatedDataToFetch) {
    nestedData[key] = await fetchAndAddRelatedNames(
      nestedData[key],
      table,
      idColumn,
      "descripcion",
      idColumn
    );
  }

  return nestedData;
};

export const fetchTrainingData = async (personaId: number) => {
  return await fetchData("capacitacion", "id_capacitacion", personaId);
};
