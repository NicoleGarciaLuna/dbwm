"use client";
import { useState } from "react";
import { Tabs, Spin } from "antd";
import LayoutComponent from "@/components/Layout/LayoutComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";
import useFetchData from "@/hooks/useFetchData";
import { fetchStatisticsData } from "@/services/fetchMaritalData";
import { categoryTabs } from "@/data/tabsConfig";

const StatisticsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { loading, data } = useFetchData(fetchStatisticsData);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const filteredTabs = categoryTabs.slice(0, -1);

  return (
    <LayoutComponent>
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
                  <PieChartComponent
                    data={data.map((item) => ({
                      name: item.name, // Generic name field
                      value: item.value, // Generic value field
                    }))}
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
    </LayoutComponent>
  );
};

export default StatisticsPage;
