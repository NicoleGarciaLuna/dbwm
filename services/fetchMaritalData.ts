import { supabase } from "@/utils/api/supabaseClient";

export const fetchStatisticsData = async (): Promise<any[] | null> => {
  try {
    const { data, error } = await supabase.from("info_personal").select(`
        estado_civil,
        estado_civil.count()
      `);

    if (error) throw error;

    return data.map((item) => ({
      name: item.estado_civil,
      value: item.count,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
