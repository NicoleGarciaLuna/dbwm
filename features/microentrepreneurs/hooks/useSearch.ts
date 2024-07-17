import { useState, useMemo } from "react";

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
