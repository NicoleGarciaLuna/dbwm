import React from 'react';
import Card from '../Card';
import { TabType, TabData } from './types';

type TabContentProps = {
  activeTab: TabType;
  tabsData: TabData;
  loading: boolean;
  tabs: Array<{ label: string; value: TabType }>;
};

const formatKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

const renderValue = (value: any): React.ReactNode => {
  if (typeof value === 'boolean') {
    return value ? 'Sí' : 'No';
  }
  if (value === null || value === undefined) {
    return 'Sin dato';
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return (
      <div className="pl-4">
        {Object.entries(value).map(([subKey, subValue]) => (
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

const createCards = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((item, index) => (
      <Card key={index} title={`Item ${index + 1}`}>
        {Object.entries(item).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="font-semibold">{formatKey(key)}:</span> {renderValue(value)}
          </div>
        ))}
      </Card>
    ));
  }

  if (typeof data === 'object' && data !== null) {
    return Object.entries(data).map(([key, value]) => (
      <Card key={key} title={formatKey(key)}>
        {renderValue(value)}
      </Card>
    ));
  }

  return <Card title="Datos">{renderValue(data)}</Card>;
};

const TabContent = ({ activeTab, tabsData, loading, tabs }: TabContentProps) => {
  if (loading) {
    return <div>Cargando datos...</div>;
  }

  const data = tabsData[activeTab];
  if (!data) {
    return <div>No hay datos disponibles.</div>;
  }

  const cards = createCards(data);

  return <div className="space-y-4">{cards}</div>;
};

export default TabContent;
