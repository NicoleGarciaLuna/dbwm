import { ReactNode } from 'react';
import Card from '../Card';
import { TabType, TabData } from './types';

type TabContentProps = {
  activeTab: TabType;
  tabsData: TabData;
  loading: boolean;
  tabs: Array<{ label: string; value: TabType }>;
};

const formatKey = (key: string): string =>
  key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

const shouldHideKey = (key: string): boolean => /^id/i.test(key);

const renderValue = (value: any): ReactNode => {
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (value == null) return 'Sin dato';
  if (typeof value === 'object' && !Array.isArray(value)) {
    return (
      <div className="pl-4">
        {Object.entries(value)
          .filter(([subKey]) => !shouldHideKey(subKey))
          .map(([subKey, subValue]) => (
            <div key={subKey} className="mb-2">
              <span className="font-semibold">{formatKey(subKey)}:</span> {renderValue(subValue)}
            </div>
          ))}
      </div>
    );
  }
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-6">
        {value.map((item, index) => (
          <li key={index}>{renderValue(item)}</li>
        ))}
      </ul>
    );
  }
  return String(value);
};

const createCardContent = (data: any): ReactNode => {
  if (Array.isArray(data)) {
    return data.map((item, index) => (
      <div key={index} className="mb-2">
        {Object.entries(item)
          .filter(([key]) => !shouldHideKey(key))
          .map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-semibold">{formatKey(key)}:</span> {renderValue(value)}
            </div>
          ))}
      </div>
    ));
  }

  if (typeof data === 'object' && data !== null) {
    return Object.entries(data)
      .filter(([key]) => !shouldHideKey(key))
      .map(([key, value]) => (
        <div key={key} className="mb-2">
          <span className="font-semibold">{formatKey(key)}:</span> {renderValue(value)}
        </div>
      ));
  }

  return renderValue(data);
};

const TabContent = ({ activeTab, tabsData, loading, tabs }: TabContentProps): ReactNode => {
  if (loading) return <div>Cargando datos...</div>;

  const data = tabsData[activeTab];
  if (!data) return <div>No hay datos disponibles.</div>;

  const activeTabLabel = tabs.find(tab => tab.value === activeTab)?.label || `Datos del Tab ${activeTab}`;

  return (
    <div className="space-y-4">
      <Card title={activeTabLabel}>
        {createCardContent(data)}
      </Card>
    </div>
  );
};

export default TabContent;
