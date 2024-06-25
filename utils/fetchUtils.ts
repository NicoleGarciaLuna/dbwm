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
  primaryKey: string;
  foreignKeys?: Array<{ key: string; references: string }>;
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
