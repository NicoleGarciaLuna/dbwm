import React, { ReactNode, memo } from "react";
import { Card, Spin, Empty } from "antd";
import { TabData } from "@/features/userProfile/utils/fetchUserProfileData";

type TabContentProps = {
  activeTab: string;
  tabsData: TabData;
  loading: boolean;
  tabs: Array<{ label: string; value: string }>;
};

// Función para convertir camel case o snake case a lenguaje natural
const formatKeyToNaturalLanguage = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1") // Insertar espacio antes de mayúsculas (camel case)
    .replace(/_/g, " ") // Reemplazar guiones bajos con espacios (snake case)
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalizar la primera letra
};

// Filtrar claves que comienzan con "id_"
const filterKeys = (key: string): boolean => {
  return !key.startsWith("id_");
};

const getActiveTabLabel = (
  activeTab: string,
  tabs: Array<{ label: string; value: string }>
): string => {
  return (
    tabs.find((tab) => tab.value === activeTab)?.label ||
    `Datos del Tab ${activeTab}`
  );
};

const renderValue = (value: any): ReactNode => {
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (value == null) return "Sin dato";
  if (typeof value === "object" && !Array.isArray(value)) {
    return (
      <div className="pl-4">
        {Object.entries(value)
          .filter(([key]) => filterKeys(key))
          .map(([key, subValue]) => (
            <div key={key} className="mb-2">
              <span className="font-semibold">
                {formatKeyToNaturalLanguage(key)}:
              </span>{" "}
              {renderValue(subValue)}
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
          .filter(([key]) => filterKeys(key))
          .map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-semibold">
                {formatKeyToNaturalLanguage(key)}:
              </span>{" "}
              {renderValue(value)}
            </div>
          ))}
      </div>
    ));
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data)
      .filter(([key]) => filterKeys(key))
      .map(([key, value]) => (
        <div key={key} className="mb-2">
          <span className="font-semibold">
            {formatKeyToNaturalLanguage(key)}:
          </span>{" "}
          {renderValue(value)}
        </div>
      ));
  }

  return renderValue(data);
};

const TabContent = memo(
  ({ activeTab, tabsData, loading, tabs }: TabContentProps): ReactNode => {
    if (loading) return <Spin tip="Cargando datos..." />;

    const data = tabsData[activeTab];
    if (!data) return <Empty description="No hay datos disponibles." />;

    const activeTabLabel = getActiveTabLabel(activeTab, tabs);

    return (
      <div className="space-y-4">
        <Card title={activeTabLabel}>{createCardContent(data)}</Card>
      </div>
    );
  }
);

TabContent.displayName = "TabContent";

export default TabContent;
