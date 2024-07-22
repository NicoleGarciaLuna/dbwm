import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default AuthLayout;
