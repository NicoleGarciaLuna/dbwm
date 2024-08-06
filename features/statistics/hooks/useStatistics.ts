import { useState, useEffect, useCallback } from "react";
import { supabaseClient } from "@/shared/utils/supabase/client";
import { ENDPOINTS } from "@/shared/config/endpoints";
import { DataItem } from "@/shared/types";

export const useStatistics = (activeTab: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Record<string, Record<string, DataItem[]>>>(
    {}
  );

  const fetchDiagnosticoIds = async () => {
    const { data, error } = await supabaseClient.rpc("get_full_diagnosticos");

    if (error) {
      console.error("Error fetching full diagnósticos:", error);
      throw error;
    }

    return data.map(
      (diagnostico: { id_diagnostico: number }) => diagnostico.id_diagnostico
    );
  };

  const fetchData = useCallback(async () => {
    if (data[activeTab]) return;

    const newData: Record<string, DataItem[]> = {};
    setLoading(true);

    try {
      // Obtener los IDs de los diagnósticos válidos
      const validDiagnosticos = await fetchDiagnosticoIds();

      const fetchPromises = ENDPOINTS[activeTab].map(async (endpoint) => {
        const { data: result, error } = await supabaseClient
          .from(endpoint.table)
          .select(endpoint.select)
          .in("id_diagnostico", validDiagnosticos); // Filtrar por los IDs válidos

        if (error) {
          console.error(`Error fetching data for ${endpoint.key}:`, error);
          return;
        }

        newData[endpoint.key] = result.map((item: Record<string, any>) => ({
          name: Object.values(item)[0],
          value: item.count,
        }));
      });

      await Promise.all(fetchPromises);

      setData((prevData) => ({
        ...prevData,
        [activeTab]: newData,
      }));
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, data };
};
