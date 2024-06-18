export type Microentrepreneur = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
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
