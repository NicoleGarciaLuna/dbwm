"use client";
import { useState } from "react";
import ProfileHeader from './ProfileHeader';
import TabButton from './TabButton';
import ProfileDetails from './ProfileDetails';
import BillingInformation from './BillingInformation';
import BillingHistory from './BillingHistory';
import GenderVariables from './GenderVariables';

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

type TabType = "personal" | "gender" | "emprendimiento" | "ideaNegocio" | "innovacion" | "mercado" | "contabilidadFinanzas" | "formalizacion" | "financiamiento" | "capacitacion";

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
      <ProfileHeader avatarSrc={avatarSrc} username={username} joinedDate={joinedDate} />
      <div className="w-full max-w-2xl">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tabs.map((tab) => (
            <TabButton 
              key={tab.value}
              label={tab.label} 
              isActive={activeTab === tab.value} 
              onClick={() => setActiveTab(tab.value)} 
            />
          ))}
        </div>
        {activeTab === "personal" && (
          <div className="space-y-6">
            <ProfileDetails name={name} email={email} contact={contact} />
            <BillingInformation cardNumber={cardNumber} expiryDate={expiryDate} cvv={cvv} />
            <BillingHistory billingHistory={billingHistory} />
          </div>
        )}
        {activeTab === "gender" && <GenderVariables />}
        {activeTab === "emprendimiento" && <div>Contenido de Emprendimiento</div>}
        {activeTab === "ideaNegocio" && <div>Contenido de Idea de Negocio</div>}
        {activeTab === "innovacion" && <div>Contenido de Innovación</div>}
        {activeTab === "mercado" && <div>Contenido de Mercado</div>}
        {activeTab === "contabilidadFinanzas" && <div>Contenido de Contabilidad y Finanzas</div>}
        {activeTab === "formalizacion" && <div>Contenido de Formalización</div>}
        {activeTab === "financiamiento" && <div>Contenido de Financiamiento</div>}
        {activeTab === "capacitacion" && <div>Contenido de Capacitación</div>}
      </div>
    </main>
  );
};

export default UserProfile;
