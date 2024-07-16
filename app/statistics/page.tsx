"use client";
import { useState } from "react";
import Layout from "@/components/LayoutComponent";
import TabsComponent from "@/components/TabsComponent";
import { CATEGORY_TABS } from "@/data/endpoints";
import { useStatistics } from "@/hooks/useStatistics";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].value);
  const { loading, data } = useStatistics(activeTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Layout>
      <TabsComponent
        loading={loading}
        tabs={CATEGORY_TABS}
        data={data}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
    </Layout>
  );
};

export default Statistics;
