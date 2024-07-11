import { supabase } from "./supabaseClient";

export const fetchData = async (table: string, select: string) => {
  try {
    const { data, error } = await supabase.from(table).select(select);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
