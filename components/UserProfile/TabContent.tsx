import React from 'react';
import Card from '../Card';
import { TabType, TabData } from './types';

type TabContentProps = {
  activeTab: TabType;
  tabsData: TabData;
  loading: boolean;
  tabs: Array<{ label: string; value: TabType }>;
};

const TabContent: React.FC<TabContentProps> = ({ activeTab, tabsData, loading, tabs }) => {
  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Card title={tabs.find(tab => tab.value === activeTab)?.label || ""}>
      <pre>{JSON.stringify(tabsData[activeTab], null, 2)}</pre>
    </Card>
  );
};

export default TabContent;
