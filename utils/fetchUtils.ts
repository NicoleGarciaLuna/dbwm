import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define types for better type safety
type Table = {
  name: string;
  foreignKey: string;
  relatedTable?: string;
  relatedKey?: string;
  targetColumn?: string;
};

type FetchDataResult<T> = {
  data: T[] | null;
  error: Error | null;
};

// Create a singleton Supabase client
const createSupabaseClient = (): SupabaseClient => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

const supabase = createSupabaseClient();

// Fetch data from a single table
export const fetchData = async <T>(table: string, column: string, value: any): Promise<T[]> => {
  const { data, error }: FetchDataResult<T> = await supabase
    .from(table)
    .select('*')
    .eq(column, value);

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data ?? [];
};

// Fetch nested data with names
export const fetchNestedDataWithNames = async (
  ids: number[],
  tables: Table[]
): Promise<Record<string, any[]>> => {
  const result: Record<string, any[]> = {};

  await Promise.all(
    tables.map(async (table) => {
      const { data, error } = await supabase
        .from(table.name)
        .select('*')
        .in(table.foreignKey, ids);

      if (error) {
        console.error(`Error fetching data from ${table.name}:`, error);
        result[table.name] = [];
      } else {
        result[table.name] = data ?? [];
      }
    })
  );

  return result;
};

// Fetch and add related names
export const fetchAndAddRelatedNames = async <T>(
  data: T[],
  relatedTable: string,
  relatedKey: string,
  targetColumn: string,
  sourceColumn: keyof T
): Promise<T[]> => {
  const relatedIds = data.map((item) => item[sourceColumn]);

  const { data: relatedData, error } = await supabase
    .from(relatedTable)
    .select(`${relatedKey}, ${targetColumn}`)
    .in(relatedKey, relatedIds);

  if (error) {
    console.error(`Error fetching related data from ${relatedTable}:`, error);
    return data;
  }

  const relatedMap = new Map(relatedData?.map((item) => [item[relatedKey], item[targetColumn]]) ?? []);

  return data.map((item) => ({
    ...item,
    [targetColumn]: relatedMap.get(item[sourceColumn]) ?? null,
  }));
};
