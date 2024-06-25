import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchData = async (table: string, column: string, value: any) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq(column, value);

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data;
};

export const fetchNestedDataWithNames = async (
  ids: number[],
  tables: { name: string; foreignKey: string; relatedTable?: string; relatedKey?: string; targetColumn?: string }[]
) => {
  const result: { [key: string]: any[] } = {};

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table.name)
      .select('*')
      .in(table.foreignKey, ids);

    if (error) {
      console.error(`Error fetching data from ${table.name}:`, error);
      result[table.name] = [];
    } else {
      result[table.name] = data;
    }
  }

  return result;
};

export const fetchAndAddRelatedNames = async (
  data: any[],
  relatedTable: string,
  relatedKey: string,
  targetColumn: string,
  sourceColumn: string
) => {
  const relatedIds = data.map((item) => item[sourceColumn]);

  const { data: relatedData, error } = await supabase
    .from(relatedTable)
    .select(`${relatedKey}, ${targetColumn}`)
    .in(relatedKey, relatedIds);

  if (error) {
    console.error(`Error fetching related data from ${relatedTable}:`, error);
    return data;
  }

  const relatedMap = new Map(relatedData.map((item) => [item[relatedKey], item[targetColumn]]));

  return data.map((item) => ({
    ...item,
    [targetColumn]: relatedMap.get(item[sourceColumn]) || null,
  }));
};
