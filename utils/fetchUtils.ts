import { createClient as createSupabaseClient } from "@/utils/supabase/server";
import { cache } from "react";

const supabaseClient = () => createSupabaseClient();

export const fetchData = cache(
  async (table: string, column: string, value: any): Promise<any[]> => {
    const supabase = supabaseClient();
    let query = supabase.from(table).select("*");

    if (Array.isArray(value)) {
      query = query.in(column, value);
    } else {
      query = query.eq(column, value);
    }

    const { data, error } = await query;
    if (error)
      throw new Error(`Error fetching data from ${table}: ${error.message}`);
    return data;
  }
);

type TableSchema = {
  name: string;
  foreignKey: string;
  relatedTable?: string;
  relatedKey?: string;
  targetColumn?: string;
};

export const fetchRelatedData = cache(
  async (
    tables: TableSchema[],
    ids: number[],
    idColumns: string[]
  ): Promise<Record<string, any[]>> => {
    const relatedData: Record<string, any[]> = {};

    for (const table of tables) {
      for (const idColumn of idColumns) {
        const data = await Promise.all(
          ids.map((id) => fetchData(table.name, idColumn, id))
        ).then((results) => results.flat());

        if (data.length > 0) {
          relatedData[table.name] = data;
          break;
        }
      }
    }

    return relatedData;
  }
);

export const fetchAndAddRelatedNames = async (
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

export const fetchNestedDataWithNames = async (
  parentIds: number[],
  tables: TableSchema[]
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
