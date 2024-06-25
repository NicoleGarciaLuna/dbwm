import { fetchData, fetchRelatedData } from "@/utils/fetchUtils";

const fetchAndAddRelatedNames = async (
  data: any[],
  relatedTable: string,
  foreignKey: string,
  targetColumn: string,
  relatedKey: string
) => {
  const ids = data.map((item) => item[foreignKey]);
  const relatedData = await fetchData(relatedTable, relatedKey, ids);
  const relatedMap = relatedData.reduce((acc, item) => {
    acc[item[relatedKey]] = item[targetColumn];
    return acc;
  }, {});

  return data.map((item) => ({
    ...item,
    [`${foreignKey}_name`]: relatedMap[item[foreignKey]] || item[foreignKey],
  }));
};

const fetchNestedDataWithNames = async (
  parentIds: number[],
  tables: { name: string; foreignKey: string; relatedTable?: string; relatedKey?: string; targetColumn?: string }[]
) => {
  const nestedData: Record<string, any> = {};

  for (const { name, foreignKey, relatedTable, relatedKey, targetColumn } of tables) {
    let data = await fetchRelatedData([{ name, foreignKey }], parentIds, [foreignKey]);
    nestedData[name] = data[name];

    if (relatedTable && relatedKey && targetColumn) {
      nestedData[name] = await fetchAndAddRelatedNames(
        nestedData[name],
        relatedTable,
        foreignKey,
        targetColumn,
        relatedKey
      );
    }
  }

  return nestedData;
};

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
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "mercado", foreignKey: "id_emprendimiento" },
    { name: "mercado_red_social", foreignKey: "id_mercado", relatedTable: "red_social", relatedKey: "id_red_social", targetColumn: "descripcion" },
    { name: "mercado_medio_venta", foreignKey: "id_mercado", relatedTable: "medio_venta", relatedKey: "id_medio_venta", targetColumn: "descripcion" },
    { name: "mercado_cliente_actual", foreignKey: "id_mercado", relatedTable: "cliente_actual", relatedKey: "id_cliente_actual", targetColumn: "descripcion" }
  ]);
};

export const fetchAccountingFinanceData = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "contabilidad_finanzas", foreignKey: "id_emprendimiento" }
  ]);
};

export const fetchFormalizationData = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "formalizacion", foreignKey: "id_emprendimiento" },
    { name: "formalizacion_aspecto_formalizacion", foreignKey: "id_formalizacion", relatedTable: "aspecto_formalizacion", relatedKey: "id_aspecto_formalizacion", targetColumn: "descripcion" }
  ]);
};

export const fetchFinancingData = async (emprendimientoIds: number[]) => {
  return await fetchNestedDataWithNames(emprendimientoIds, [
    { name: "financiamiento", foreignKey: "id_emprendimiento" },
    { name: "financiamiento_fondo_programa_estado", foreignKey: "id_financiamiento", relatedTable: "fondo_programa_estado", relatedKey: "id_fondo_programa_estado", targetColumn: "descripcion" },
    { name: "financiamiento_necesidad_financiamiento", foreignKey: "id_financiamiento", relatedTable: "necesidad_financiamiento", relatedKey: "id_necesidad_financiamiento", targetColumn: "descripcion" },
    { name: "financiamiento_razon_no_credito", foreignKey: "id_financiamiento", relatedTable: "razon_no_credito", relatedKey: "id_razon_no_credito", targetColumn: "descripcion" },
    { name: "financiamiento_recurso_disponible", foreignKey: "id_financiamiento", relatedTable: "recurso_disponible", relatedKey: "id_recurso_disponible", targetColumn: "descripcion" },
    { name: "financiamiento_origen_inversion_inicial", foreignKey: "id_financiamiento", relatedTable: "origen_inversion_inicial", relatedKey: "id_origen_inversion_inicial", targetColumn: "descripcion" }
  ]);
};

export const fetchTrainingData = async (personaId: number) => {
  const trainingData = await fetchData("capacitacion", "id_capacitacion", personaId);
  return trainingData;
};
