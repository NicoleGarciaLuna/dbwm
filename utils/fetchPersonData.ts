import {
  fetchStandardizedData,
  fetchNestedDataWithNames,
  fetchAndAddRelatedNames,
} from "@/utils/fetchUtils";

type Relation = {
  table: string;
  foreignKey: string;
  relatedKey: string;
  targetColumn: string;
};

type NestedRelation = {
  name: string;
  foreignKey: string;
  relatedTable?: string;
  relatedKey?: string;
  targetColumn?: string;
};

const fetchStandardized = async (
  entity: string,
  key: string,
  personaId: number,
  relations: Relation[]
) => {
  return await fetchStandardizedData(entity, key, personaId, relations);
};

export const fetchPersonalInfo = (personaId: number) =>
  fetchStandardized("persona", "id_persona", personaId, [
    {
      table: "distrito",
      foreignKey: "id_distrito",
      relatedKey: "id_distrito",
      targetColumn: "descripcion",
    },
    {
      table: "diagnostico",
      foreignKey: "id_diagnostico",
      relatedKey: "id_diagnostico",
      targetColumn: "fecha_diagnostico",
    },
  ]);

export const fetchGenderVariables = (personaId: number) =>
  fetchStandardized("variable_genero", "id_genero", personaId, [
    {
      table: "tipo_cuido",
      foreignKey: "id_genero",
      relatedKey: "id_tipo_cuido",
      targetColumn: "descripcion",
    },
    {
      table: "encargado_tareas_hogar",
      foreignKey: "id_genero",
      relatedKey: "id_encargado_tareas_hogar",
      targetColumn: "descripcion",
    },
  ]);

export const fetchEntrepreneurshipData = (personaId: number) =>
  fetchStandardized("emprendimiento", "id_persona", personaId, [
    {
      table: "persona",
      foreignKey: "id_persona",
      relatedKey: "id_persona",
      targetColumn: "nombre",
    },
  ]);

export const fetchBusinessIdeas = (emprendimientoIds: number[]) =>
  fetchNestedDataWithNames(emprendimientoIds, [
    { name: "idea_negocio", foreignKey: "id_emprendimiento" },
  ]);

const fetchNestedDataWithRelations = async (
  emprendimientoIds: number[],
  relations: NestedRelation[]
) => {
  const nestedData = await fetchNestedDataWithNames(
    emprendimientoIds,
    relations
  );

  for (const relation of relations) {
    if (relation.relatedTable && relation.relatedKey && relation.targetColumn) {
      nestedData[relation.name] = await fetchAndAddRelatedNames(
        nestedData[relation.name],
        relation.relatedTable,
        relation.relatedKey,
        relation.targetColumn,
        relation.relatedKey
      );
    }
  }

  return nestedData;
};

export const fetchInnovationData = (emprendimientoIds: number[]) =>
  fetchNestedDataWithRelations(emprendimientoIds, [
    { name: "innovacion", foreignKey: "id_emprendimiento" },
    {
      name: "innovacion_inversion_idi",
      foreignKey: "id_innovacion",
      relatedTable: "inversion_idi",
      relatedKey: "id_inversion_idi",
      targetColumn: "descripcion",
    },
    {
      name: "innovacion_herramienta_metodologia",
      foreignKey: "id_innovacion",
      relatedTable: "herramienta_metodologia",
      relatedKey: "id_herramienta_metodologia",
      targetColumn: "descripcion",
    },
    {
      name: "innovacion_tipo_innovacion",
      foreignKey: "id_innovacion",
      relatedTable: "tipo_innovacion",
      relatedKey: "id_tipo_innovacion",
      targetColumn: "descripcion",
    },
  ]);

export const fetchMarketData = async (emprendimientoIds: number[]) => {
  const marketRelations: NestedRelation[] = [
    { name: "mercado", foreignKey: "id_emprendimiento" },
    { name: "mercado_red_social", foreignKey: "id_mercado" },
    { name: "mercado_medio_venta", foreignKey: "id_mercado" },
    { name: "mercado_cliente_actual", foreignKey: "id_mercado" },
  ];

  const nestedData = await fetchNestedDataWithNames(
    emprendimientoIds,
    marketRelations
  );

  const relatedDataToFetch = [
    {
      key: "mercado_red_social",
      table: "red_social",
      idColumn: "id_red_social",
      descColumn: "descripcion",
    },
    {
      key: "mercado_medio_venta",
      table: "medio_venta",
      idColumn: "id_medio_venta",
      descColumn: "descripcion",
    },
    {
      key: "mercado_cliente_actual",
      table: "cliente_actual",
      idColumn: "id_cliente_actual",
      descColumn: "descripcion",
    },
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

export const fetchAccountingFinanceData = (emprendimientoIds: number[]) =>
  fetchNestedDataWithNames(emprendimientoIds, [
    { name: "contabilidad_finanzas", foreignKey: "id_emprendimiento" },
  ]);

export const fetchFormalizationData = (emprendimientoIds: number[]) =>
  fetchNestedDataWithRelations(emprendimientoIds, [
    { name: "formalizacion", foreignKey: "id_emprendimiento" },
    {
      name: "formalizacion_aspecto_formalizacion",
      foreignKey: "id_formalizacion",
      relatedTable: "aspecto_formalizacion",
      relatedKey: "id_aspecto_formalizacion",
      targetColumn: "descripcion",
    },
  ]);

export const fetchFinancingData = (emprendimientoIds: number[]) =>
  fetchNestedDataWithRelations(emprendimientoIds, [
    { name: "financiamiento", foreignKey: "id_emprendimiento" },
    {
      name: "financiamiento_fondo_programa_estado",
      foreignKey: "id_financiamiento",
      relatedTable: "fondo_programa_estado",
      relatedKey: "id_fondo_programa_estado",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_necesidad_financiamiento",
      foreignKey: "id_financiamiento",
      relatedTable: "necesidad_financiamiento",
      relatedKey: "id_necesidad_financiamiento",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_razon_no_credito",
      foreignKey: "id_financiamiento",
      relatedTable: "razon_no_credito",
      relatedKey: "id_razon_no_credito",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_recurso_disponible",
      foreignKey: "id_financiamiento",
      relatedTable: "recurso_disponible",
      relatedKey: "id_recurso_disponible",
      targetColumn: "descripcion",
    },
    {
      name: "financiamiento_origen_inversion_inicial",
      foreignKey: "id_financiamiento",
      relatedTable: "origen_inversion_inicial",
      relatedKey: "id_origen_inversion_inicial",
      targetColumn: "descripcion",
    },
  ]);

export const fetchTrainingData = (personaId: number) =>
  fetchStandardizedData("capacitacion", "id_capacitacion", personaId, []);
