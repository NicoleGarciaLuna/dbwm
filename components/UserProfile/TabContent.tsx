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

const filterAndFormatData = (data: any): Record<string, any> => {
  if (!data) {
    return {};
  }

  return Object.entries(data)
    .filter(([key]) => !key.startsWith('id_'))
    .reduce((acc, [key, value]) => {
      acc[formatKey(key)] = value ?? 'Sin dato';
      return acc;
    }, {} as Record<string, any>);
};

const flattenData = (data: any): any[] => {
  const result = [];

  const processObject = (obj: any, prefix: string = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const formattedKey = prefix ? `${prefix} ${formatKey(key)}` : formatKey(key);
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processObject(value, formattedKey);
      } else {
        result.push({ key: formattedKey, value });
      }
    });
  };

  if (Array.isArray(data)) {
    data.forEach((item, index) => processObject(item, `Item ${index + 1}`));
  } else if (typeof data === 'object') {
    processObject(data);
  }

  return result;
};

const createCards = (data: any) => {
  const flatData = flattenData(data);

  return flatData.map(({ key, value }) => (
    <Card key={key} title={key}>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Card>
  ));
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

  return <div>{cards}</div>;
};

export default TabContent;
