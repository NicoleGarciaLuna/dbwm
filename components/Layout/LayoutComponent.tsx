"use client";
import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { menuItems } from "../../data/menuItems";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

type LayoutProps = {
  children: React.ReactNode;
};

const CustomLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleBreakpoint = (broken: boolean) => {
    setCollapsed(broken);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        collapsedWidth={0}
        onBreakpoint={handleBreakpoint}
        width={200}
        trigger={null}
        style={{
          paddingTop: "64px",
          position: "fixed",
          height: "100vh",
          zIndex: 2,
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: "white",
            position: "fixed",
            width: "100%",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MenuOutlined
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "24px",
              marginLeft: "16px",
              cursor: "pointer",
            }}
          />
        </Header>
        <Content
          style={{
            marginTop: "64px",
            overflow: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: 24,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
