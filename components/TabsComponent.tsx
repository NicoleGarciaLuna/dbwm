import { Tabs, Spin } from "antd";
import CustomPieChart from "@/components/charts/PieChartComponent";

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
  data: DataItem[] | null;
};

const TabsComponent = ({ loading, tabs, data }: TabsComponentProps) => {
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
              {tab.value === "personal" && data ? (
                <CustomPieChart data={data} />
              ) : (
                tab.value
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default TabsComponent;
