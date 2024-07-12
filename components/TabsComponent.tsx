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
  personalData: DataItem[] | null;
  educationData: DataItem[] | null;
};

const TabsComponent = ({
  loading,
  tabs,
  personalData,
  educationData,
}: TabsComponentProps) => {
  const renderTabContent = (tabValue: string) => {
    switch (tabValue) {
      case "personal":
        return (
          <>
            {personalData && <CustomPieChart data={personalData} />}
            {educationData && <CustomBarChart data={educationData} />}
          </>
        );
      default:
        return tabValue;
    }
  };

  return (
    <div>
      {loading ? (
        <Spin tip="Cargando...">
          <div style={{ height: "200px" }} />
        </Spin>
      ) : (
        <Tabs onChange={(key: string) => console.log(key)} type="card">
          {tabs.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.value}>
              {renderTabContent(tab.value)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default TabsComponent;
