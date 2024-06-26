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
    ? "text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
    : "";
  const disabledClasses = isDisabled
    ? "cursor-not-allowed text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white";

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
