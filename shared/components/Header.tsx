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
import { signOut } from "@/app/(auth)/login/actions"; // Importar la función de cierre de sesión

const { Header: AntHeader } = AntLayout;
const { useBreakpoint } = Grid;

const headerStyles = {
  header: {
    position: "fixed" as const,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001529",
  },
  logo: {
    position: "absolute" as const,
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

type LogoProps = {
  src: string;
  alt: string;
  size: number;
  text: string;
};

const Logo = ({ src, alt, size, text }: LogoProps) => (
  <div style={headerStyles.logo}>
    <Image
      src={src}
      alt={alt}
      height={size}
      width={size}
      style={headerStyles.logoImage}
    />
    {text}
  </div>
);

type NavigationMenuProps = {
  current: string;
};

const NavigationMenu = ({ current }: NavigationMenuProps) => {
  const handleMenuClick = (label: string) => {
    if (label === "Cerrar Sesión") {
      signOut();
    }
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[current]}
      style={headerStyles.menu}
      onClick={(e) => handleMenuClick(e.key)}
    >
      {menuItems.map(({ href, label }) => (
        <Menu.Item key={label}>
          {href ? <Link href={href}>{label}</Link> : label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const Header = () => {
  const screens = useBreakpoint();
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <AntHeader style={headerStyles.header}>
      <Logo src={LOGO_SRC} alt={LOGO_ALT} size={LOGO_SIZE} text={LOGO_TEXT} />
      {screens.md ? (
        <NavigationMenu current={current} />
      ) : (
        <DrawerMenu menuItems={menuItems} />
      )}
    </AntHeader>
  );
};

export default Header;
