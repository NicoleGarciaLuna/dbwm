import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { ENDPOINTS } from "@/data/endpoints";
import { DataItem } from "@/types";

export const useStatistics = (activeTab: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, Record<string, DataItem[]>>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      if (data[activeTab]) return;

      setLoading(true);
      const newData: Record<string, DataItem[]> = {};

      for (const endpoint of ENDPOINTS[activeTab]) {
        const { data: result, error } = await supabase
          .from(endpoint.table)
          .select(endpoint.select);

        if (error) {
          console.error(`Error fetching data for ${endpoint.key}:`, error);
          continue;
        }

        newData[endpoint.key] = result.map((item: Record<string, any>) => ({
          name: Object.values(item)[0],
          value: item.count,
        }));
      }

      setData((prevData) => ({
        ...prevData,
        [activeTab]: newData,
      }));

      setLoading(false);
    };

    fetchData();
  }, [activeTab, data]);

  return { loading, data };
};
