import React, { ReactNode, memo } from "react";
import { Card, Spin, Empty } from "antd";
import { TabData } from "@/features/userProfile/utils/fetchUserProfileData";

type TabContentProps = {
  activeTab: string;
  tabsData: TabData;
  loading: boolean;
  tabs: Array<{ label: string; value: string }>;
};

// Obtiene la etiqueta del tab activo
const getActiveTabLabel = (
  activeTab: string,
  tabs: Array<{ label: string; value: string }>
): string => {
  return (
    tabs.find((tab) => tab.value === activeTab)?.label ||
    `Datos del Tab ${activeTab}`
  );
};

// Función de renderizado del valor
const renderValue = (value: any): ReactNode => {
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (value == null) return "Sin dato";
  if (typeof value === "object" && !Array.isArray(value)) {
    return (
      <div className="pl-4">
        {Object.entries(value).map(([key, subValue]) => (
          <div key={key} className="mb-2">
            <span className="font-semibold">{key}:</span>{" "}
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

// Función para crear el contenido de la tarjeta
const createCardContent = (data: any): ReactNode => {
  if (Array.isArray(data)) {
    return data.map((item, index) => (
      <div key={index} className="mb-2">
        {Object.entries(item).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="font-semibold">{key}:</span> {renderValue(value)}
          </div>
        ))}
      </div>
    ));
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="mb-2">
        <span className="font-semibold">{key}:</span> {renderValue(value)}
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
