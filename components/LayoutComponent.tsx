"use client";
import React from "react";
import { Layout, Menu } from "antd";
import { MenuProps } from "antd/es/menu";
import Link from "next/link";
import Image from "next/image";

const { Header, Content } = Layout;

const styles = {
  layout: {
    minHeight: "100vh",
  } as React.CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  } as React.CSSProperties,
  content: {
    padding: "12px 0",
    margin: "0 12px",
    flex: 1,
  } as React.CSSProperties,
  logoContainer: {
    position: "absolute",
    left: "16px",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  menu: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  } as React.CSSProperties,
  menuItem: {
    color: "white",
    fontWeight: "bold",
  } as React.CSSProperties,
};

interface LayoutComponentProps {
  children: React.ReactNode;
}

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <span style={styles.menuItem}>
        <Link href="/">Microempresarias</Link>
      </span>
    ),
  },
  {
    key: "2",
    label: (
      <span style={styles.menuItem}>
        <Link href="/statistics">Statistics</Link>
      </span>
    ),
  },
  {
    key: "3",
    label: (
      <span style={styles.menuItem}>
        <Link href="/login">Cerrar Sesión</Link>
      </span>
    ),
  },
];

const LayoutComponent: React.FC<LayoutComponentProps> = ({ children }) => {
  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div style={styles.logoContainer}>
          <Image
            src="/logo TCU mujer pnjs-10.png"
            alt="Project Logo"
            style={{ marginRight: "16px" }}
            height={50}
            width={50}
          />
          <div style={{ color: "white", fontWeight: "bold" }}>
            Microempresarias TCU - 781
          </div>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={styles.menu}
        />
      </Header>
      <Content style={styles.content}>{children}</Content>
    </Layout>
  );
};

export default LayoutComponent;
