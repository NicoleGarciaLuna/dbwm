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
  const [activeTab, setActiveTab] = useState<"personal" | "gender">("personal");

  return (
    <main className="flex flex-col items-center p-4">
      <ProfileHeader avatarSrc={avatarSrc} username={username} joinedDate={joinedDate} />
      <div className="w-full max-w-2xl">
        <div className="flex justify-center gap-4 mb-6">
          <TabButton 
            label="Información personal" 
            isActive={activeTab === "personal"} 
            onClick={() => setActiveTab("personal")} 
          />
          <TabButton 
            label="Variables genero" 
            isActive={activeTab === "gender"} 
            onClick={() => setActiveTab("gender")} 
          />
        </div>
        {activeTab === "personal" && (
          <div className="space-y-6">
            <ProfileDetails name={name} email={email} contact={contact} />
            <BillingInformation cardNumber={cardNumber} expiryDate={expiryDate} cvv={cvv} />
            <BillingHistory billingHistory={billingHistory} />
          </div>
        )}
        {activeTab === "gender" && <GenderVariables />}
      </div>
    </main>
  );
};

export default UserProfile;
