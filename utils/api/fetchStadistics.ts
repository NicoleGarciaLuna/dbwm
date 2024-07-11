import { supabase } from "./supabaseClient";

export const fetchMaritalStatusData = async () => {
  try {
    const { data, error } = await supabase.from("info_personal").select(`
        estado_civil,
        estado_civil.count()
      `);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
