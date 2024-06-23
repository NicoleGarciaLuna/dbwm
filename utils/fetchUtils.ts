import { cache } from "react";

export const fetchData = cache(
  async (
    supabase: any,
    table: string,
    column: string,
    value: any
  ): Promise<any[]> => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, value);
    if (error)
      throw new Error(`Error fetching data from ${table}: ${error.message}`);
    return data;
  }
);

export const fetchRelatedData = cache(
  async (
    supabase: any,
    tables: string[],
    column: string,
    values: any[]
  ): Promise<Record<string, any[]>> => {
    const relatedData = await Promise.all(
      tables.map((table) =>
        Promise.all(
          values.map((value) => fetchData(supabase, table, column, value))
        )
      )
    );
    return tables.reduce((acc, table, index) => {
      acc[table] = relatedData[index];
      return acc;
    }, {} as Record<string, any[]>);
  }
);

export const fetchNames = cache(
  async (
    supabase: any,
    table: string,
    ids: number[],
    idColumn: string,
    nameColumn: string
  ): Promise<Record<number, string>> => {
    const { data, error } = await supabase
      .from(table)
      .select(`${idColumn}, ${nameColumn}`)
      .in(idColumn, ids);
    if (error)
      throw new Error(`Error fetching names from ${table}: ${error.message}`);

    return data.reduce((acc: Record<number, string>, item: any) => {
      acc[item[idColumn]] = item[nameColumn];
      return acc;
    }, {});
  }
);

export const fetchNamesForTables = async (
  supabase: any,
  relatedData: Record<string, any[]>,
  idColumnsMap: Record<string, string>,
  descriptionColumn: string
) => {
  const promises = Object.entries(relatedData).map(([table, data]) => {
    const ids = data.flat().map((item: any) => item[idColumnsMap[table]]);
    return fetchNames(
      supabase,
      table.split("_").slice(1).join("_"),
      ids,
      idColumnsMap[table],
      descriptionColumn
    );
  });
  const namesData = await Promise.all(promises);
  return Object.keys(relatedData).reduce((acc, table, index) => {
    acc[table] = namesData[index];
    return acc;
  }, {} as Record<string, Record<number, string>>);
};

export const mapNestedData = (
  relatedData: Record<string, any[]>,
  namesData: Record<string, Record<number, string>>,
  idColumnsMap: Record<string, string>
) => {
  return Object.entries(relatedData).reduce((acc, [key, data]) => {
    acc[key] = data.flat().map((item: any) => ({
      ...item,
      descripcion: namesData[key][item[idColumnsMap[key]]],
    }));
    return acc;
  }, {} as Record<string, any[]>);
};
