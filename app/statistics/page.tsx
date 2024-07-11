"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/LayoutComponent";
import TabsComponent from "@/components/TabsComponent";
import { categoryTabs } from "@/data/tabsConfig";
import { fetchData } from "@/utils/api/fetchStatistics";

type DataItem = {
  name: string;
  value: number;
};

interface DataFetcher {
  fetchStatistics: (
    table: string,
    select: string
  ) => Promise<DataItem[] | null>;
}

const apiFetcher: DataFetcher = {
  fetchStatistics: async (table: string, select: string) => {
    const result = await fetchData(table, select);
    if (result) {
      return result.map((item: any) => ({
        name: item.estado_civil,
        value: item.count,
      }));
    }
    return null;
  },
};

const Statistics = ({ dataFetcher }: { dataFetcher: DataFetcher }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[] | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await dataFetcher.fetchStatistics(
        "info_personal",
        "estado_civil, estado_civil.count()"
      );
      setData(result);
      setLoading(false);
    };

    fetchDataAsync();
  }, [dataFetcher]);

  const filteredTabs = categoryTabs.slice(0, -1);

  return (
    <Layout>
      <TabsComponent loading={loading} tabs={filteredTabs} data={data} />
    </Layout>
  );
};

const StatisticsContainer = () => <Statistics dataFetcher={apiFetcher} />;

export default StatisticsContainer;
