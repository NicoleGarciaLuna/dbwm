import { useState, useMemo } from "react";

export const PAGE_SIZE = 8;

export const COLUMN_CONFIG = [
  { key: "fullName", header: "Nombre Completo" },
  { key: "company", header: "Empresa" },
  { key: "sector", header: "Sector" },
  { key: "businessIdea", header: "Idea de Negocio" },
  { key: "experienceYears", header: "Años de Experiencia" },
  { key: "actions", header: "Acciones", isAction: true },
];

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

export const useSearch = (data: any[], searchFields: string[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      searchFields.some((field) =>
        item[field].toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery, searchFields]);

  return { searchQuery, handleSearch, filteredData };
};
