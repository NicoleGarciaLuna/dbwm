import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { menuItems } from "../data/menuItems";

type LayoutProps = {
	children: ReactNode;
};

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
