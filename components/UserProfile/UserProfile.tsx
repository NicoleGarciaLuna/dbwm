"use client";

import { Tabs, Spin } from "antd";
import { useUserProfileData } from "@/utils/api/fetchUserProfileData";
import ProfileHeader from "./Header";
import TabContent from "./Tab";
import { Suspense } from "react";

type UserProfileProps = {
  personaId: number;
  avatarSrc: string;
};

const UserProfile = ({ personaId, avatarSrc }: UserProfileProps) => {
  const {
    activeTab,
    setActiveTab,
    tabsData,
    loading,
    username,
    joinedDate,
    tabs,
  } = useUserProfileData(personaId);

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey as string);
  };

  return (
    <main className="flex flex-col items-center p-4">
      {loading && !username ? (
        <Spin tip="Cargando..." />
      ) : (
        <>
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
              items={tabs.map((tab) => ({ key: tab, label: tab }))}
            />
            <div className="mt-6">
              <Suspense fallback={<Spin tip="Cargando contenido..." />}>
                <TabContent
                  activeTab={activeTab}
                  tabsData={tabsData}
                  loading={loading}
                  tabs={tabs}
                />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default UserProfile;
