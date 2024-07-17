"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import TabsComponent from "@/components/Tabs";
import { CATEGORY_TABS } from "@/data/endpoints";
import { useStatistics } from "@/hooks/useStatistics";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].value);
  const { loading, data: rawData } = useStatistics(activeTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Layout>
      <TabsComponent
        loading={loading}
        tabs={CATEGORY_TABS}
        data={rawData}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
    </Layout>
  );
};

export default Statistics;
