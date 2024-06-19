"use client";
import { useState, useMemo } from "react";
import MicroentrepreneursTable from "./MicroentrepreneursTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { Microentrepreneur } from "../types";

type MicroentrepreneursListProps = {
	data: Microentrepreneur[];
};

const MicroentrepreneursList = ({ data }: MicroentrepreneursListProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredData = useMemo(() => {
		return data.filter(
			(microentrepreneur) =>
				microentrepreneur.fullName
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				microentrepreneur.company
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				microentrepreneur.sector
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				microentrepreneur.mainActivity
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		);
	}, [data, searchQuery]);

	const totalPages = Math.ceil(filteredData.length / 10);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const paginatedData = filteredData.slice(
		(currentPage - 1) * 10,
		currentPage * 10
	);

	return (
		<section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
			<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
						{/* Add other controls like filters, actions, etc. here */}
					</div>
					<MicroentrepreneursTable data={paginatedData} />
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	);
};

export default MicroentrepreneursList;
