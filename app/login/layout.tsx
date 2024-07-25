import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default AuthLayout;
