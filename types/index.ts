export type Microentrepreneur = {
  fullName: string;
  company: string;
  sector: string;
  businessIdea: string;
  experienceYears: string;
  id: number;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type SearchBarProps = {
  searchQuery: string;
  onSearch: (query: string) => void;
};

export type ChartData = {
  name: string;
  value: number;
};
