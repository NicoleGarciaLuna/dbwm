import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { menuItems } from '../data/menuItems';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar items={menuItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
