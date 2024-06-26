import { ReactNode } from "react";

type PaginationButtonProps = {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const PaginationButton = ({
  children,
  onClick,
  isActive,
  isDisabled,
}: PaginationButtonProps) => {
  const baseClasses =
    "flex items-center justify-center text-sm py-2 px-3 leading-tight";
  const activeClasses = isActive
    ? "text-primary-800 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-primary-700 dark:bg-primary-700 dark:text-white"
    : "";
  const disabledClasses = isDisabled
    ? "cursor-not-allowed text-primary-500 bg-primary-100 dark:bg-primary-700 dark:text-primary-400"
    : "text-primary-500 bg-white border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-primary-800 dark:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${activeClasses} ${disabledClasses}`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
