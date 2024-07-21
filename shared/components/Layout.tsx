"use client";

import { Layout as AntLayout, Menu, Drawer, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const { Header, Content } = AntLayout;
const { useBreakpoint } = Grid;

const LOGO_SRC = "/logo-orange-blue.png";
const LOGO_ALT = "Project Logo";
const LOGO_TEXT = "Microempresarias TCU - 781";
const LOGO_SIZE = 50;

const styles: { [key: string]: React.CSSProperties } = {
  layout: { minHeight: "100vh", overflow: "hidden" },
  header: {
    position: "fixed",
    width: "100%",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001529",
  },
  logo: {
    position: "absolute",
    left: 16,
    display: "flex",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
  },
  logoImage: { marginRight: 16 },
  menu: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },
  menuButton: {
    fontSize: "24px",
    color: "#fff",
    background: "none",
    border: "none",
    position: "absolute",
    right: 16,
  },
  drawerHeader: { backgroundColor: "#001529", color: "white" },
  drawerBody: { backgroundColor: "#001529", color: "white" },
  content: {
    marginTop: 64,
    height: "calc(100vh - 64px)",
    overflowY: "auto" as "auto",
  },
};

const menuItems = [
  { key: "/", label: "Microempresarias", href: "/" },
  { key: "/statistics", label: "Estadísticas", href: "/statistics" },
  { key: "/login", label: "Cerrar Sesión", href: "/login" },
];

const Logo = () => (
  <div style={styles.logo}>
    <Image
      src={LOGO_SRC}
      alt={LOGO_ALT}
      height={LOGO_SIZE}
      width={LOGO_SIZE}
      style={styles.logoImage}
    />
    {LOGO_TEXT}
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const toggleDrawer = useCallback(() => setDrawerVisible((prev) => !prev), []);

  return (
    <AntLayout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        {screens.md ? (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[current]}
            style={styles.menu}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <>
            <Button
              type="text"
              icon={<MenuOutlined />}
              style={styles.menuButton}
              onClick={toggleDrawer}
            />
            <Drawer
              title="Menu"
              placement="right"
              closable
              onClose={toggleDrawer}
              open={drawerVisible}
              style={styles.drawerBody}
              bodyStyle={styles.drawerBody}
              headerStyle={styles.drawerHeader}
            >
              <Menu mode="vertical" selectedKeys={[current]} theme="dark">
                {menuItems.map((item) => (
                  <Menu.Item key={item.key}>
                    <Link href={item.href}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Drawer>
          </>
        )}
      </Header>
      <Content style={styles.content}>{children}</Content>
    </AntLayout>
  );
};

export default Layout;
