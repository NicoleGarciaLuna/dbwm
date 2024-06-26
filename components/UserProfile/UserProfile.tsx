"use client";
import { useCallback } from "react";
import ProfileHeader from "./ProfileHeader";
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";
import { TabType } from "./types";
import { useUserProfileData } from "@/utils/useUserProfileData";
import * as fetchFunctions from "@/utils/fetchPersonData";

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
    return <div>Cargando...</div>;
  }

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        username={username}
        joinedDate={joinedDate}
        avatarSrc={avatarSrc}
      />
      <div className="w-full max-w-6xl">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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
