import { supabase } from "./supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";
import { logger } from "@/utils/logging/logger";

class FetchError extends Error {
  constructor(message: string, public details: any) {
    super(message);
    this.name = "FetchError";
  }
}

type FetchDataResult<T> = {
  data: T[] | null;
  error: PostgrestError | null;
};

export const fetchDataWithRelatedTables = async <T extends Record<string, any>>(
  table: string,
  column: string,
  value: any,
  relatedTables: {
    table: string;
    foreignKey: string;
    relatedKey: string;
    targetColumn: string;
  }[] = []
): Promise<T[]> => {
  try {
    const { data, error }: FetchDataResult<T> = await supabase
      .from(table)
      .select("*")
      .eq(column, value);

    if (error) {
      throw new FetchError(`Error fetching data from ${table}`, error);
    }

    if (!data) return [];

    for (const relatedTable of relatedTables) {
      const relatedIds = data.map((item) => item[relatedTable.foreignKey]);
      const { data: relatedData, error: relatedError } = await supabase
        .from(relatedTable.table)
        .select(`${relatedTable.relatedKey}, ${relatedTable.targetColumn}`)
        .in(relatedTable.relatedKey, relatedIds);

      if (relatedError) {
        throw new FetchError(
          `Error fetching related data from ${relatedTable.table}`,
          relatedError
        );
      }

      const relatedMap = new Map(
        relatedData?.map((item: Record<string, any>) => [
          item[relatedTable.relatedKey],
          item[relatedTable.targetColumn],
        ]) ?? []
      );

      data.forEach((item) => {
        (item as Record<string, any>)[relatedTable.targetColumn] =
          relatedMap.get(item[relatedTable.foreignKey]) ?? null;
      });
    }

    logger.info(`Successfully fetched data from ${table}`);
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      logger.error(error.message, error.details);
    } else {
      logger.error(`Unexpected error in fetchDataWithRelatedTables`, error);
    }
    throw error;
  }
};

export const fetchNestedDataWithNames = async (
  ids: number[],
  tables: {
    name: string;
    foreignKey: string;
    relatedTable?: string;
    relatedKey?: string;
    targetColumn?: string;
  }[]
): Promise<Record<string, any[]>> => {
  const result: Record<string, any[]> = {};

  try {
    await Promise.all(
      tables.map(async (table) => {
        const { data, error } = await supabase
          .from(table.name)
          .select("*")
          .in(table.foreignKey, ids);

        if (error) {
          throw new FetchError(`Error fetching data from ${table.name}`, error);
        }

        result[table.name] = data ?? [];
      })
    );

    logger.info(`Successfully fetched nested data for ${tables.length} tables`);
    return result;
  } catch (error) {
    if (error instanceof FetchError) {
      logger.error(error.message, error.details);
    } else {
      logger.error(`Unexpected error in fetchNestedDataWithNames`, error);
    }
    throw error;
  }
};

export const fetchAndAddRelatedNames = async <T extends Record<string, any>>(
  data: T[],
  relatedTable: string,
  relatedKey: string,
  targetColumn: string,
  sourceColumn: keyof T
): Promise<T[]> => {
  try {
    const relatedIds = data.map((item) => item[sourceColumn]);

    const { data: relatedData, error } = await supabase
      .from(relatedTable)
      .select(`${relatedKey}, ${targetColumn}`)
      .in(relatedKey, relatedIds);

    if (error) {
      throw new FetchError(
        `Error fetching related data from ${relatedTable}`,
        error
      );
    }

    const relatedMap = new Map(
      relatedData?.map((item: Record<string, any>) => [
        item[relatedKey],
        item[targetColumn],
      ]) ?? []
    );

    const result = data.map((item) => ({
      ...item,
      [targetColumn]: relatedMap.get(item[sourceColumn]) ?? null,
    }));

    logger.info(
      `Successfully fetched and added related names for ${relatedTable}`
    );
    return result;
  } catch (error) {
    if (error instanceof FetchError) {
      logger.error(error.message, error.details);
    } else {
      logger.error(`Unexpected error in fetchAndAddRelatedNames`, error);
    }
    throw error;
  }
};
