import { Tabs, Spin, Card } from "antd";
import dynamic from "next/dynamic";
import { useMemo, useCallback } from "react";
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
      return (
        <Card
          key={key}
          style={{ marginBottom: "16px" }}
        >
          <ChartComponent data={chartData} title={title} />
        </Card>
      );
    },
    []
  );

  const renderTabContent = useCallback(
    (tabValue: string) => {
      if (loading) {
        return (
          <Spin>
            <div style={{ height: "200px" }} />
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

      return charts;
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
    <div style={{ textAlign: "center" }}>
      <Tabs
        activeKey={activeTab}
        onChange={onTabChange}
        type="card"
        items={items}
        centered
      />
    </div>
  );
};

export default Tab;
