import { Tabs, Spin } from "antd";
import dynamic from "next/dynamic";
import React, { useMemo, useCallback } from "react";
import { DataItem, ChartType } from "@/shared/types";
import { ENDPOINTS } from "@/shared/config/endpoints";

const CustomPieChart = dynamic(
  () => import("@/features/statistics/components/charts/PieChart"),
  { ssr: false }
);
const CustomBarChart = dynamic(
  () => import("@/features/statistics/components/charts/BarChart"),
  { ssr: false }
);

const styles = {
  gridContainer: {
    display: "grid",
    gap: "1.5vw",
    padding: "1vw",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridAutoFlow: "dense",
    maxWidth: "1500px",
    margin: "0 auto",
  },
  gridItem: {
    border: "2px solid #464545",
    borderRadius: "5px",
  },
  barChart: {
    gridColumn: "span 8",
  },
  pieChart: {
    gridColumn: "span 4",
  },
  loadingContainer: {
    height: "200px",
  },
};

type TabProps = {
  loading: boolean;
  tabs: { label: string; value: string }[];
  data: Record<string, Record<string, DataItem[]>>;
  onTabChange: (key: string) => void;
  activeTab: string;
};

const Tab = ({ loading, tabs, data, onTabChange, activeTab }: TabProps) => {
  const renderChart = useCallback(
    (
      chartData: DataItem[] | undefined,
      title: string,
      chartType: ChartType,
      key: string
    ) => {
      if (!chartData || chartData.length === 0) return null;
      const ChartComponent =
        chartType === ChartType.PIE ? CustomPieChart : CustomBarChart;
      const style =
        chartType === ChartType.PIE ? styles.pieChart : styles.barChart;
      return (
        <div style={{ ...styles.gridItem, ...style }} key={key}>
          <ChartComponent data={chartData} title={title} />
        </div>
      );
    },
    []
  );

  const renderTabContent = useCallback(
    (tabValue: string) => {
      if (loading) {
        return (
          <Spin>
            <div style={styles.loadingContainer} />
          </Spin>
        );
      }

      if (!data[tabValue] || Object.keys(data[tabValue]).length === 0) {
        return <div>No hay datos disponibles para esta categoría.</div>;
      }

      const endpointsForTab = ENDPOINTS[tabValue] || [];
      const charts = endpointsForTab
        .map((endpoint) => {
          const chartData = data[tabValue][endpoint.key];
          return renderChart(
            chartData,
            endpoint.key,
            endpoint.chartType,
            endpoint.key
          );
        })
        .filter(Boolean);

      if (charts.length === 0) {
        return <div>No hay datos disponibles para esta categoría.</div>;
      }

      return <div style={styles.gridContainer}>{charts}</div>;
    },
    [loading, data, renderChart]
  );

  const items = useMemo(
    () =>
      tabs.map((tab) => ({
        key: tab.value,
        label: tab.label,
        children: renderTabContent(tab.value),
      })),
    [tabs, renderTabContent]
  );

  return (
    <Tabs
      activeKey={activeTab}
      onChange={onTabChange}
      type="card"
      items={items}
    />
  );
};

export default Tab;
