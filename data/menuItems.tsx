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
		label: "Kanban",
		icon: <KanbanIcon />,
	},
	{
		href: "#",
		label: "Inbox",
		icon: <InboxIcon />,
		badge: "3",
		badgeColor: "text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
	},
	{
		href: "#",
		label: "Users",
		icon: <UsersIcon />,
	},
	{
		href: "#",
		label: "Products",
		icon: <ProductsIcon />,
	},
	{
		href: "#",
		label: "Sign In",
		icon: <SignInIcon />,
	},
	{
		href: "#",
		label: "Sign Up",
		icon: <SignUpIcon />,
	},
];
