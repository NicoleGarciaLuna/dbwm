import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  href?: string,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label: href ? <Link href={href}>{label}</Link> : label,
  } as MenuItem;
};

export const menuItems: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />, "/"),
  getItem("Option 2", "2", <DesktopOutlined />, "/"),
  getItem("User", "sub1", <UserOutlined />, undefined, [
    getItem("Tom", "3", undefined, "/"),
    getItem("Bill", "4", undefined, "/"),
    getItem("Alex", "5", undefined, "/user/alex"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, undefined, [
    getItem("Team 1", "6", undefined, "/"),
    getItem("Team 2", "8", undefined, "/team/team2"),
  ]),
  getItem("Files", "9", <FileOutlined />, "/"),
];
