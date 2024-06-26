import { ReactNode } from "react";
import NavItem from "../MicroentrepreneursList/NavItem";

type SidebarItem = {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: string;
  badgeColor?: string;
};

type SidebarProps = {
  items: SidebarItem[];
};

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <>
      <MobileSidebarToggle />
      <DesktopSidebar items={items} />
    </>
  );
};

const MobileSidebarToggle = () => (
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-primary-500 rounded-lg sm:hidden hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:text-primary-400 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    <span className="sr-only">Open sidebar</span>
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>
);

const DesktopSidebar = ({ items }: SidebarProps) => (
  <aside
    id="default-sidebar"
    className="w-64 h-full transition-transform sm:translate-x-0 flex-shrink-0"
    aria-label="Sidebar"
  >
    <div className="h-full px-3 py-4 overflow-y-auto bg-primary-50 dark:bg-primary-800">
      <ul className="space-y-2 font-medium">
        {items.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            icon={item.icon}
            badge={item.badge}
            badgeColor={item.badgeColor}
          >
            {item.label}
          </NavItem>
        ))}
      </ul>
    </div>
  </aside>
);

export default Sidebar;
