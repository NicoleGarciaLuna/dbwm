import { CSSProperties } from "react";

interface HeaderStyles {
  header: CSSProperties;
  logo: CSSProperties;
  logoImage: CSSProperties;
  menu: CSSProperties;
  menuButton: CSSProperties;
  drawerHeader: CSSProperties;
  drawerBody: CSSProperties;
}

const styles: HeaderStyles = {
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

export default styles;
