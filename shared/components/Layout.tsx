"use client";

import { Layout as AntLayout } from "antd";
import { ReactNode } from "react";
import Header from "@/shared/components/Header";

const { Content } = AntLayout;

const styles: { [key: string]: React.CSSProperties } = {
  layout: { minHeight: "100vh", overflow: "hidden" },
  content: {
    marginTop: 64,
    height: "calc(100vh - 64px)",
    overflowY: "auto" as "auto",
  },
};

const Layout = ({ children }: { children: ReactNode }) => (
  <AntLayout style={styles.layout}>
    <Header />
    <Content style={styles.content}>{children}</Content>
  </AntLayout>
);

export default Layout;
