import React, { ReactNode } from "react";
import { DashboardIcon, KanbanIcon, InboxIcon, UsersIcon, ProductsIcon, SignInIcon, SignUpIcon } from "../components/icons/DashboardIcons";

type MenuItem = {
	href: string;
	label: string;
	icon: ReactNode;
	badge?: string;
	badgeColor?: string;
};

export const menuItems: MenuItem[] = [
	{
		href: "#",
		label: "Dashboard",
		icon: <DashboardIcon />,
	},
	{
		href: "#",
		label: "Microempresarias",
		icon: <KanbanIcon />,
	},
	{
		href: "#",
		label: "Gráficos",
		icon: <InboxIcon />,
		badge: "3",
		badgeColor: "text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
	},
	{
		href: "#",
		label: "Reportes",
		icon: <UsersIcon />,
	},
	{
		href: "#",
		label: "Productos",
		icon: <ProductsIcon />,
	},
	{
		href: "#",
		label: "Iniciar Sesión",
		icon: <SignInIcon />,
	},
	{
		href: "#",
		label: "Cerrar Sesión",
		icon: <SignUpIcon />,
	},
];
