import { Tabs, Spin } from "antd";
import { DataItem, ChartType } from "@/shared/types";
import CustomPieChart from "@/features/statistics/components/charts/PieChart";
import CustomBarChart from "@/features/statistics/components/charts/BarChart";
import { ENDPOINTS } from "@/shared/config/endpoints";
import { useMemo, useCallback } from "react";

type TabsComponentProps = {
  loading: boolean;
  tabs: { label: string; value: string }[];
  data: Record<string, Record<string, DataItem[]>>;
  onTabChange: (key: string) => void;
  activeTab: string;
};

const TabsComponent = ({
  loading,
  tabs,
  data,
  onTabChange,
  activeTab,
}: TabsComponentProps) => {
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
      return <ChartComponent key={key} data={chartData} title={title} />;
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
    <Tabs
      activeKey={activeTab}
      onChange={onTabChange}
      type="card"
      items={items}
    />
  );
};

export default TabsComponent;
