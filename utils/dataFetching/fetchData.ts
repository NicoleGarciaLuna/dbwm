import {
  fetchDataWithRelatedTables,
  fetchNestedDataWithNames,
  fetchAndAddRelatedNames,
} from "@/utils/api/fetchData";

export type Relation = {
  table: string;
  foreignKey: string;
  relatedKey: string;
  targetColumn: string;
};

export type NestedRelation = {
  name: string;
  foreignKey: string;
  relatedTable?: string;
  relatedKey?: string;
  targetColumn?: string;
};

export const fetchStandardized = async (
  entity: string,
  key: string,
  personaId: number,
  relations: Relation[]
) => {
  return await fetchDataWithRelatedTables(entity, key, personaId, relations);
};

export const fetchGenericData = (
  entity: string,
  key: string,
  personaId: number,
  relations: Relation[]
) => fetchStandardized(entity, key, personaId, relations);

export const fetchNestedData = async (
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
