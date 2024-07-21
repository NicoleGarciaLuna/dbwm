"use client";

import { Layout as AntLayout, Grid } from "antd";
import { ReactNode } from "react";
import Header from "@/shared/components/Header";

const { Content } = AntLayout;
const { useBreakpoint } = Grid;

const Layout = ({ children }: { children: ReactNode }) => {
  const screens = useBreakpoint();

  return (
    <AntLayout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Header />
      <Content
        style={{
          marginTop: 64,
          padding: screens.sm ? "24px" : "16px",
          paddingTop: screens.sm ? "32px" : "24px",
          paddingBottom: screens.sm ? "32px" : "24px",
          height: "calc(100vh - 64px)",
          overflowY: "auto",
        }}
      >
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;
