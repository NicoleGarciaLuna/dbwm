"use client";
import { Tabs, Spin } from "antd";
import { useUserProfileData } from "@/utils/useUserProfileData";
import * as fetchFunctions from "@/utils/fetchPersonData";
import ProfileHeader from "./Header";
import TabContent from "./Tab";
import { TabType } from "./types";

type UserProfileProps = {
  personaId: number;
  avatarSrc: string;
};

const UserProfile = ({ personaId, avatarSrc }: UserProfileProps) => {
  const tabs: Array<{ label: string; value: TabType }> = [
    { label: "Información personal", value: "personal" },
    { label: "Variables género", value: "gender" },
    { label: "Emprendimiento", value: "emprendimiento" },
    { label: "Idea negocio", value: "ideaNegocio" },
    { label: "Innovación", value: "innovacion" },
    { label: "Mercado", value: "mercado" },
    { label: "Contabilidad y finanzas", value: "contabilidadFinanzas" },
    { label: "Formalización", value: "formalizacion" },
    { label: "Financiamiento", value: "financiamiento" },
    { label: "Capacitación", value: "capacitacion" },
  ];

  const { activeTab, setActiveTab, tabsData, loading, username, joinedDate } =
    useUserProfileData(personaId, fetchFunctions);

  if (loading && !username) {
    return <Spin tip="Cargando..." />;
  }

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey as TabType);
  };

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        username={username}
        joinedDate={joinedDate}
        avatarSrc={avatarSrc}
      />
      <div className="w-full max-w-6xl">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabBarGutter={16}
          items={tabs.map((tab) => ({ key: tab.value, label: tab.label }))}
        />
        <div className="mt-6">
          <TabContent
            activeTab={activeTab}
            tabsData={tabsData}
            loading={loading}
            tabs={tabs}
          />
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
