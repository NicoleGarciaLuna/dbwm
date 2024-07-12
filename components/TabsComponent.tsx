import { Tabs, Spin } from "antd";
import CustomPieChart from "@/components/charts/PieChartComponent";
import CustomBarChart from "@/components/charts/BarChartComponent";

type DataItem = {
  name: string;
  value: number;
};

type Tab = {
  label: string;
  value: string;
};

type TabsComponentProps = {
  loading: boolean;
  tabs: Tab[];
  data: { [key: string]: { [key: string]: DataItem[] | null } | undefined };
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
    dataKey: string,
    ChartComponent: React.ComponentType<{ data: DataItem[] }>
  ) => {
    const chartData = data[activeTab]?.[dataKey];
    return chartData ? <ChartComponent data={chartData} /> : null;
  };

  const renderTabContent = (tabValue: string) => {
    if (loading && activeTab === tabValue) {
      return (
        <Spin tip="Cargando...">
          <div style={{ height: "200px" }} />
        </Spin>
      );
    }

    switch (tabValue) {
      case "personal":
        return (
          <>
            {renderChart("maritalStatusData", CustomPieChart)}
            {renderChart("educationData", CustomBarChart)}
          </>
        );
      case "gender":
        return (
          <>
            {renderChart("householdTasksTimeData", CustomBarChart)}
            {renderChart("householdUtilityPercentageData", CustomPieChart)}
            {renderChart("dependentsData", CustomBarChart)}
            {renderChart("entrepreneurshipAutonomyData", CustomBarChart)}
          </>
        );
      case "emprendimiento":
        return (
          <>
            {renderChart("businessTypeData", CustomBarChart)}
            {renderChart("operationTimeData", CustomBarChart)}
            {renderChart("economicSectorData", CustomBarChart)}
            {renderChart("businessStageData", CustomBarChart)}
            {renderChart("siecRegistrationData", CustomPieChart)}
          </>
        );
      case "ideaNegocio":
        return (
          <>
            {renderChart("businessIdeaStatusData", CustomBarChart)}
            {renderChart("developedInstrumentsData", CustomBarChart)}
          </>
        );
      case "innovacion":
        return (
          <>
            {renderChart("ticsUsageData", CustomBarChart)}
            {renderChart(
              "intellectualPropertyRegistrationData",
              CustomPieChart
            )}
          </>
        );
      case "mercado":
        return (
          <>
            {renderChart("digitalMarketingStrategyData", CustomBarChart)}
            {renderChart("monthlySalesAverageData", CustomBarChart)}
            {renderChart("identifiedCompetitorsData", CustomPieChart)}
            {renderChart("targetMarketData", CustomBarChart)}
            {renderChart("segmentedMarketData", CustomPieChart)}
            {renderChart("brandImageData", CustomBarChart)}
            {renderChart("currentClientsData", CustomBarChart)}
            {renderChart("salesChannelsData", CustomBarChart)}
          </>
        );
      case "contabilidadFinanzas":
        return (
          <>
            {renderChart("monthlyBaseSalaryData", CustomBarChart)}
            {renderChart("annualBudgetData", CustomPieChart)}
            {renderChart("inventoryControlData", CustomPieChart)}
          </>
        );
      case "formalizacion":
        return (
          <>
            {renderChart("formalizationInterestData", CustomPieChart)}
            {renderChart("formalizationStepsKnowledgeData", CustomBarChart)}
            {renderChart("formalizationAspectsData", CustomBarChart)}
          </>
        );
      case "financiamiento":
        return (
          <>
            {renderChart("activeCreditData", CustomPieChart)}
            {renderChart("currentCreditOperationsData", CustomBarChart)}
            {renderChart("stateProgramFundsData", CustomBarChart)}
            {renderChart("financingNeedsData", CustomBarChart)}
            {renderChart("noCreditReasonsData", CustomPieChart)}
            {renderChart("availableResourcesData", CustomBarChart)}
            {renderChart("initialInvestmentSourceData", CustomBarChart)}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={onTabChange} type="card">
        {tabs.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.value}>
            {renderTabContent(tab.value)}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsComponent;
