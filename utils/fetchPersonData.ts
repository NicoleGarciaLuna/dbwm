import { fetchData, fetchNestedDataWithNames, fetchAndAddRelatedNames } from "@/utils/fetchUtils";

export const fetchPersonalInfo = async (personaId: number) => {
  const persona = await fetchData("persona", "id_persona", personaId);
  return persona[0];
};

export const fetchGenderVariables = async (personaId: number) => {
  const genderData = await fetchData("variable_genero", "id_genero", personaId);
  return genderData;
};

export const fetchEntrepreneurshipData = async (personaId: number) => {
  const entrepreneurship = await fetchData("emprendimiento", "id_persona", personaId);
  return entrepreneurship;
};

export const fetchBusinessIdeas = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "idea_negocio", foreignKey: "id_emprendimiento" }
  ]);
};

export const fetchInnovationData = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "innovacion", foreignKey: "id_emprendimiento" },
    { name: "innovacion_inversion_idi", foreignKey: "id_innovacion", relatedTable: "inversion_idi", relatedKey: "id_inversion_idi", targetColumn: "descripcion" },
    { name: "innovacion_herramienta_metodologia", foreignKey: "id_innovacion", relatedTable: "herramienta_metodologia", relatedKey: "id_herramienta_metodologia", targetColumn: "descripcion" },
    { name: "innovacion_tipo_innovacion", foreignKey: "id_innovacion", relatedTable: "tipo_innovacion", relatedKey: "id_tipo_innovacion", targetColumn: "descripcion" }
  ]);
};

export const fetchMarketData = async (emprendimientoIds: number[]) => {
  const nestedData = await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "mercado", foreignKey: "id_emprendimiento" },
    { name: "mercado_red_social", foreignKey: "id_mercado" },
    { name: "mercado_medio_venta", foreignKey: "id_mercado" },
    { name: "mercado_cliente_actual", foreignKey: "id_mercado" }
  ]);

  nestedData["mercado_red_social"] = await fetchAndAddRelatedNames(
    nestedData["mercado_red_social"],
    "red_social",
    "id_red_social",
    "descripcion",
    "id_red_social"
  );
  nestedData["mercado_medio_venta"] = await fetchAndAddRelatedNames(
    nestedData["mercado_medio_venta"],
    "medio_venta",
    "id_medio_venta",
    "descripcion",
    "id_medio_venta"
  );
  nestedData["mercado_cliente_actual"] = await fetchAndAddRelatedNames(
    nestedData["mercado_cliente_actual"],
    "cliente_actual",
    "id_cliente_actual",
    "descripcion",
    "id_cliente_actual"
  );

  return nestedData;
};

export const fetchAccountingFinanceData = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "contabilidad_finanzas", foreignKey: "id_emprendimiento" }
  ]);
};

export const fetchFormalizationData = async (emprendimientoIds: number[]) => {
  const nestedData = await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "formalizacion", foreignKey: "id_emprendimiento" },
    { name: "formalizacion_aspecto_formalizacion", foreignKey: "id_formalizacion" }
  ]);

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
  const nestedData = await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "financiamiento", foreignKey: "id_emprendimiento" },
    { name: "financiamiento_fondo_programa_estado", foreignKey: "id_financiamiento" },
    { name: "financiamiento_necesidad_financiamiento", foreignKey: "id_financiamiento" },
    { name: "financiamiento_razon_no_credito", foreignKey: "id_financiamiento" },
    { name: "financiamiento_recurso_disponible", foreignKey: "id_financiamiento" },
    { name: "financiamiento_origen_inversion_inicial", foreignKey: "id_financiamiento" }
  ]);

  nestedData["financiamiento_fondo_programa_estado"] = await fetchAndAddRelatedNames(
    nestedData["financiamiento_fondo_programa_estado"],
    "fondo_programa_estado",
    "id_fondo_programa_estado",
    "descripcion",
    "id_fondo_programa_estado"
  );
  nestedData["financiamiento_necesidad_financiamiento"] = await fetchAndAddRelatedNames(
    nestedData["financiamiento_necesidad_financiamiento"],
    "necesidad_financiamiento",
    "id_necesidad_financiamiento",
    "descripcion",
    "id_necesidad_financiamiento"
  );
  nestedData["financiamiento_razon_no_credito"] = await fetchAndAddRelatedNames(
    nestedData["financiamiento_razon_no_credito"],
    "razon_no_credito",
    "id_razon_no_credito",
    "descripcion",
    "id_razon_no_credito"
  );
  nestedData["financiamiento_recurso_disponible"] = await fetchAndAddRelatedNames(
    nestedData["financiamiento_recurso_disponible"],
    "recurso_disponible",
    "id_recurso_disponible",
    "descripcion",
    "id_recurso_disponible"
  );
  nestedData["financiamiento_origen_inversion_inicial"] = await fetchAndAddRelatedNames(
    nestedData["financiamiento_origen_inversion_inicial"],
    "origen_inversion_inicial",
    "id_origen_inversion_inicial",
    "descripcion",
    "id_origen_inversion_inicial"
  );

  return nestedData;
};

export const fetchTrainingData = async (personaId: number) => {
  const trainingData = await fetchData("capacitacion", "id_capacitacion", personaId);
  return trainingData;
};
