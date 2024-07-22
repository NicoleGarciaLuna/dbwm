import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { menuItems, MenuItem } from "@/shared/config";

const drawerStyles: { [key: string]: React.CSSProperties } = {
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
  closeIcon: { color: "white" },
};

const renderMenuItems = (menuItems: MenuItem[]) =>
  menuItems.map((item: MenuItem) => (
    <Menu.Item key={item.href}>
      <Link href={item.href}>{item.label}</Link>
    </Menu.Item>
  ));

const DrawerMenu = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const toggleDrawer = useCallback(() => setDrawerVisible((prev) => !prev), []);

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined />}
        style={drawerStyles.menuButton}
        onClick={toggleDrawer}
      />
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={toggleDrawer}
        open={drawerVisible}
        width={240}
        styles={{
          header: drawerStyles.drawerHeader,
          body: drawerStyles.drawerBody,
        }}
        closeIcon={<MenuOutlined style={drawerStyles.closeIcon} />}
      >
        <Menu mode="vertical" selectedKeys={[current]} theme="dark">
          {renderMenuItems(menuItems)}
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
