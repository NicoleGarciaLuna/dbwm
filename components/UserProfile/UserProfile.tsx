"use client";
import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import TabButton from "./TabButton";
import ProfileDetails from "./ProfileDetails";
import GenderVariables from "./GenderVariablesTab";
import Card from "../Card";

type UserProfileProps = {
  avatarSrc: string;
  username: string;
  joinedDate: string;
  name: string;
  email: string;
  contact: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingHistory: Array<{ date: string; amount: string; status: string }>;
};

type TabType =
  | "personal"
  | "gender"
  | "emprendimiento"
  | "ideaNegocio"
  | "innovacion"
  | "mercado"
  | "contabilidadFinanzas"
  | "formalizacion"
  | "financiamiento"
  | "capacitacion";

const UserProfile = ({
  avatarSrc,
  username,
  joinedDate,
  name,
  email,
  contact,
  cardNumber,
  expiryDate,
  cvv,
  billingHistory,
}: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

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

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader
        avatarSrc={avatarSrc}
        username={username}
        joinedDate={joinedDate}
      />
      <div className="w-full max-w-6xl">
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
        <div className="mt-6">
          {activeTab === "personal" && (
            <div className="space-y-6">
              <ProfileDetails name={name} email={email} contact={contact} />
            </div>
          )}
          {activeTab === "gender" && <GenderVariables />}
          {activeTab === "emprendimiento" && (
            <div>Contenido de Emprendimiento</div>
          )}
          {activeTab === "ideaNegocio" && (
            <div>Contenido de Idea de Negocio</div>
          )}
          {activeTab === "innovacion" && (
            <Card title="Innovacion">Contenido de Innovación</Card>
          )}
          {activeTab === "mercado" && <div>Contenido de Mercado</div>}
          {activeTab === "contabilidadFinanzas" && (
            <div>Contenido de Contabilidad y Finanzas</div>
          )}
          {activeTab === "formalizacion" && (
            <div>Contenido de Formalización</div>
          )}
          {activeTab === "financiamiento" && (
            <div>Contenido de Financiamiento</div>
          )}
          {activeTab === "capacitacion" && <div>Contenido de Capacitación</div>}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
