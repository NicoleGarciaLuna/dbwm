import React from 'react';
import Layout from './Layout';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default AppLayout;
