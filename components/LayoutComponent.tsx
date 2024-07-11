"use client";
import { useState, useEffect, ReactNode } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    textAlign: "center",
    height: 64,
    lineHeight: "64px",
    backgroundColor: "#001529",
    color: "#fff",
    padding: "0 20px",
  },
  sider: {
    backgroundColor: "#fff",
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 64,
    bottom: 0,
  },
  content: {
    padding: 24,
    minHeight: "calc(100vh - 64px)",
    transition: "margin-left 0.2s",
    backgroundColor: "#fff",
  },
  trigger: {
    padding: "0 24px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "color 0.3s",
  },
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={styles.header}>
        <span style={{ float: "left" }}>
          {collapsed ? (
            <MenuUnfoldOutlined onClick={toggle} style={styles.trigger} />
          ) : (
            <MenuFoldOutlined onClick={toggle} style={styles.trigger} />
          )}
        </span>
        Dashboard Header
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={styles.sider}
          trigger={null}
          width={200}
          collapsedWidth={0}
          breakpoint="md"
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              User
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            {/* Agrega más ítems de menú aquí */}
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 0 : 200,
            transition: "margin-left 0.2s",
          }}
        >
          <Content style={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
