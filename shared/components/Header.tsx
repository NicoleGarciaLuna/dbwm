"use client";

import { Layout as AntLayout, Menu, Grid } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LOGO_SRC,
  LOGO_ALT,
  LOGO_TEXT,
  LOGO_SIZE,
  menuItems,
} from "@/shared/config";
import DrawerMenu from "./DrawerMenu";

const { Header: AntHeader } = AntLayout;
const { useBreakpoint } = Grid;

const headerStyles: { [key: string]: React.CSSProperties } = {
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
};

const Logo = () => (
  <div style={headerStyles.logo}>
    <Image
      src={LOGO_SRC}
      alt={LOGO_ALT}
      height={LOGO_SIZE}
      width={LOGO_SIZE}
      style={headerStyles.logoImage}
    />
    {LOGO_TEXT}
  </div>
);

const Header = () => {
  const screens = useBreakpoint();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <AntHeader style={headerStyles.header}>
      <Logo />
      {screens.md ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          style={headerStyles.menu}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        <DrawerMenu />
      )}
    </AntHeader>
  );
};

export default Header;
