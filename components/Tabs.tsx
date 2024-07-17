import { Tabs, Spin } from "antd";
import { ENDPOINTS } from "@/config/endpoints";
import { DataItem, ChartType } from "@/types";
import CustomPieChart from "@/components/charts/PieChart";
import CustomBarChart from "@/components/charts/BarChart";

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
  const renderChart = (
    chartData: DataItem[] | undefined,
    title: string,
    chartType: ChartType,
    key: string
  ) => {
    if (!chartData || chartData.length === 0) return null;
    const ChartComponent =
      chartType === ChartType.PIE ? CustomPieChart : CustomBarChart;
    return <ChartComponent key={key} data={chartData} title={title} />;
  };

  const renderTabContent = (tabValue: string) => {
    if (loading) {
      return (
        <Spin tip="Cargando...">
          <div style={{ height: "200px" }} />
        </Spin>
      );
    }

    if (!data || !data[tabValue]) {
      return null;
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
      .filter(Boolean); // Filtramos los charts nulos

    if (charts.length === 0) {
      return <div>No hay datos disponibles para esta categoría.</div>;
    }

    return charts;
  };

  const items = tabs.map((tab) => ({
    key: tab.value,
    label: tab.label,
    children: renderTabContent(tab.value),
  }));

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
