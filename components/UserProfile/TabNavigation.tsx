import React from 'react';
import TabButton from './TabButton';
import { TabType } from './types';

type TabNavigationProps = {
  tabs: Array<{ label: string; value: TabType }>;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <nav className="mb-6 overflow-x-auto">
      <ul className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4">
        {tabs.map((tab) => (
          <li key={tab.value}>
            <TabButton
              label={tab.label}
              isActive={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigation;
