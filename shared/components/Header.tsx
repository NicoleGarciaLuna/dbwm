"use client";

import { Layout as AntLayout, Menu, Drawer, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { LOGO_SRC, LOGO_ALT, LOGO_TEXT, LOGO_SIZE, menuItems } from "@/shared/config";

const { Header: AntHeader } = AntLayout;
const { useBreakpoint } = Grid;

const styles: { [key: string]: React.CSSProperties } = {
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
};



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

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const toggleDrawer = useCallback(() => setDrawerVisible((prev) => !prev), []);

  return (
    <AntHeader style={styles.header}>
      <Logo />
      {screens.md ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          style={styles.menu}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.href}>
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
            styles={{ header: styles.drawerHeader, body: styles.drawerBody }}
          >
            <Menu mode="vertical" selectedKeys={[current]} theme="dark">
              {menuItems.map((item) => (
                <Menu.Item key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </>
      )}
    </AntHeader>
  );
};

export default Header;
