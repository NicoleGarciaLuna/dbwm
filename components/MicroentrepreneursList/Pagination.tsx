import { PaginationProps } from "../../types";
import PaginationButton from "./PaginationButton";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-primary-500 dark:text-primary-400">
        Showing{" "}
        <span className="font-semibold text-primary-900 dark:text-white">
          {(currentPage - 1) * 10 + 1}-
          {Math.min(currentPage * 10, totalPages * 10)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-primary-900 dark:text-white">
          {totalPages * 10}
        </span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </PaginationButton>
        {createPageNumbers().map((page) => (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            isActive={page === currentPage}
          >
            {page}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </PaginationButton>
      </ul>
    </nav>
  );
};

export default Pagination;
