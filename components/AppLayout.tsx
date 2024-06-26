import Layout from "./Layout/Layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default AppLayout;
