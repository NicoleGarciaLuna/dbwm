export const LOGO_SRC = "/logo-orange-blue.png";
export const LOGO_ALT = "Project Logo";
export const LOGO_TEXT = "Microempresarias TCU - 781";
export const LOGO_SIZE = 50;

export type MenuItem = {
	href?: string;
	label: string;
};

export const menuItems: MenuItem[] = [
	{ href: "/", label: "Microempresarias" },
	{ href: "/statistics", label: "Estadísticas" },
	{ label: "Cerrar Sesión" },
];
