export type Microentrepreneur = {
	fullName: string;
	company: string;
	sector: string;
	mainActivity: string;
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
