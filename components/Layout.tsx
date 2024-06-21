import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../app/globals.css";
import { DashboardIcon, KanbanIcon, InboxIcon, UsersIcon, ProductsIcon, SignInIcon, SignUpIcon } from "./icons/DashboardIcons";

type LayoutProps = {
	children: ReactNode;
};

const menuItems = [
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

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="flex">
			<Sidebar items={menuItems} />
			<div className="flex-1">
				<Header />
				<main className="p-4">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
