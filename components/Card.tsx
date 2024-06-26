import React from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

const Card = ({ title, children, action }: CardProps) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
    {action && <div className="mt-4 text-right">{action}</div>}
  </div>
);

export default Card;
