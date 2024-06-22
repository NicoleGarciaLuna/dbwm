"use client";
import Image from "next/image";
import { useState } from "react";

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
      <div className="flex items-center gap-3 mb-6">
        <div className="relative h-24 w-24">
          <Image
            src={avatarSrc}
            alt={`${username} avatar`}
            className="h-full w-full rounded-full object-cover"
            width={50}
            height={50}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full">
            {username.charAt(0)}
          </div>
        </div>
        <div className="grid gap-0.5 text-xs">
          <div className="font-medium text-2xl">{username}</div>
          <div className="text-gray-500 dark:text-gray-400">
            Joined in {joinedDate}
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl">
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 font-medium rounded-md ${
              activeTab === "personal"
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-gray-200"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Información personal
          </button>
          <button
            className={`px-4 py-2 font-medium rounded-md ${
              activeTab === "gender"
                ? "text-white bg-blue-500"
                : "text-blue-500 bg-gray-200"
            }`}
            onClick={() => setActiveTab("gender")}
          >
            Variables genero
          </button>
        </div>
        {activeTab === "personal" && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    defaultValue={name}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    defaultValue={email}
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact
                  </label>
                  <input
                    id="contact"
                    defaultValue={contact}
                    type="tel"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 text-right">
                <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md">
                  Update Profile
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Billing Information
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    id="card"
                    defaultValue={cardNumber}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    defaultValue={expiryDate}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    defaultValue={cvv}
                    type="password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 text-right">
                <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md">
                  Update Billing
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Billing History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billingHistory.map(({ date, amount, status }, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === "gender" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Variables de Género</h2>
            <p>
              Aquí puedes agregar el contenido relacionado con las variables de
              género.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default UserProfile;
