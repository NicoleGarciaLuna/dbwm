import { useState } from "react";
import { PAGE_SIZE } from "@/config";

export const usePagination = (totalItems: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = (data: any[]) => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return data.slice(start, end);
  };

  return { currentPage, totalPages, handlePageChange, paginatedData };
};
