"use client";
import { useState, useEffect } from "react";
import { Tabs, Spin } from "antd";
import CustomPieChart from "@/components/charts/PieChartComponent";
import { fetchData } from "@/utils/api/fetchStatistics";
import { categoryTabs } from "@/data/tabsConfig";
import Layout from "@/components/LayoutComponent";

type DataItem = {
  name: string;
  value: number;
};

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData(
        "info_personal",
        "estado_civil, estado_civil.count()"
      );
      if (result) {
        setData(
          result.map((item: any) => ({
            name: item.estado_civil,
            value: item.count,
          }))
        );
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, []);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const filteredTabs = categoryTabs.slice(0, -1);

  return (
    <Layout>
      <div>
        {loading ? (
          <Spin tip="Cargando...">
            <div style={{ height: "200px" }} />
          </Spin>
        ) : (
          <Tabs onChange={(key: string) => console.log(key)} type="card">
            {filteredTabs.map((tab) => (
              <Tabs.TabPane tab={tab.label} key={tab.value}>
                {tab.value === "personal" && data ? (
                  <CustomPieChart
                    data={data}
                    activeIndex={activeIndex}
                    onPieEnter={onPieEnter}
                  />
                ) : (
                  tab.value
                )}
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Statistics;
