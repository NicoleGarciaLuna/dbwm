"use client";

import { Layout, Menu, Drawer, Button, Grid } from "antd";
import { MenuProps } from "antd/es/menu";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect, memo } from "react";
import { usePathname } from "next/navigation";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const LOGO_SRC = "/logo-orange-blue.png";
const LOGO_ALT_TEXT = "Project Logo";
const LOGO_TEXT = "Microempresarias TCU - 781";
const LOGO_SIZE = 50;
const MENU_ITEM_STYLE = {
  color: "white",
  fontWeight: "bold",
} as React.CSSProperties;

const styles: { [key: string]: React.CSSProperties } = {
  layout: { minHeight: "100vh", overflow: "hidden" },
  headerWrapper: {
    height: "64px",
    width: "100%",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001529",
    height: 64,
    width: "100%",
    position: "relative",
    boxSizing: "border-box",
  },
  logoContainer: {
    position: "absolute",
    left: 16,
    display: "flex",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
  },
  logoImage: {
    marginRight: 16,
  },
  menu: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  contentWrapper: {
    marginTop: "64px",
    height: "calc(100vh - 64px)",
    overflowY: "auto",
  },
  menuButton: {
    display: "none",
    fontSize: "24px",
    color: "#fff",
    background: "none",
    border: "none",
    height: "64px",
    alignItems: "center",
  },
  drawerMenu: {
    backgroundColor: "#001529",
    color: "white",
  },
  mobileMenuButton: {
    display: "block",
    position: "absolute",
    right: 16,
  },
  drawerHeader: {
    backgroundColor: "#001529",
    color: "white",
  },
};

const menuItems: MenuProps["items"] = [
  {
    key: "/",
    label: (
      <span style={MENU_ITEM_STYLE}>
        <Link href="/">Microempresarias</Link>
      </span>
    ),
  },
  {
    key: "/statistics",
    label: (
      <span style={MENU_ITEM_STYLE}>
        <Link href="/statistics">Estadísticas</Link>
      </span>
    ),
  },
  {
    key: "/login",
    label: (
      <span style={MENU_ITEM_STYLE}>
        <Link href="/login">Cerrar Sesión</Link>
      </span>
    ),
  },
];

const Logo = memo(() => (
  <div style={styles.logoContainer}>
    <Image
      src={LOGO_SRC}
      alt={LOGO_ALT_TEXT}
      height={LOGO_SIZE}
      width={LOGO_SIZE}
      style={styles.logoImage}
    />
    {LOGO_TEXT}
  </div>
));

Logo.displayName = "Logo";

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const showDrawer = useCallback(() => setDrawerVisible(true), []);
  const closeDrawer = useCallback(() => setDrawerVisible(false), []);

  return (
    <Layout style={styles.layout}>
      <div style={styles.headerWrapper}>
        <Header style={styles.header}>
          <Logo />
          {screens.md ? (
            <Menu
              theme="dark"
              mode="horizontal"
              items={menuItems}
              style={styles.menu}
              selectedKeys={[current]}
            />
          ) : (
            <>
              <Button
                type="text"
                icon={<MenuOutlined />}
                style={{ ...styles.menuButton, ...styles.mobileMenuButton }}
                onClick={showDrawer}
              />
              <Drawer
                title="Menu"
                placement="right"
                closable
                onClose={closeDrawer}
                open={drawerVisible}
                style={styles.drawerMenu}
              >
                <Menu
                  mode="vertical"
                  items={menuItems}
                  theme="dark"
                  selectedKeys={[current]}
                />
              </Drawer>
            </>
          )}
        </Header>
      </div>
      <div style={styles.contentWrapper}>
        <Content>{children}</Content>
      </div>
    </Layout>
  );
};

export default LayoutComponent;
