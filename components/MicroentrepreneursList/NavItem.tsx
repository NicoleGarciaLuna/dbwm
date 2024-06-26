import { ReactNode } from "react";

type NavItemProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  badge?: string;
  badgeColor?: string;
};

const NavItem = ({ href, children, icon, badge, badgeColor }: NavItemProps) => (
  <li>
    <a
      href={href}
      className="flex items-center p-2 text-primary-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700 group"
    >
      {icon}
      <span className="flex-1 ms-3 whitespace-nowrap">{children}</span>
      {badge && (
        <span
          className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </a>
  </li>
);

export default NavItem;
