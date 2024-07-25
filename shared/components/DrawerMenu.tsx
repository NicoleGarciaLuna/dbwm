import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/shared/config"; // Asegúrate de importar MenuItem
import { menuItems } from "@/shared/config"; // Importar menuItems correctamente
import { signOut } from "@/app/(auth)/login/actions"; // Importar la función de cierre de sesión

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

const renderMenuItems = (
  menuItems: MenuItem[],
  handleMenuClick: (label: string) => void
) =>
  menuItems.map((item: MenuItem) => (
    <Menu.Item key={item.label} onClick={() => handleMenuClick(item.label)}>
      {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
    </Menu.Item>
  ));

type DrawerMenuProps = {
  menuItems: MenuItem[];
};

const DrawerMenu = ({ menuItems }: DrawerMenuProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const toggleDrawer = useCallback(() => setDrawerVisible((prev) => !prev), []);

  const handleMenuClick = (label: string) => {
    if (label === "Cerrar Sesión") {
      signOut();
    }
    setDrawerVisible(false);
  };

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
          {renderMenuItems(menuItems, handleMenuClick)}
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
