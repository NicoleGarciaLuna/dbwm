"use client";
import { useState, useMemo } from "react";
import { Table, Pagination, Input, Modal, Button } from "antd";
import { Microentrepreneur } from "@/types";
import { columnConfig } from "@/data/columnConfig";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

type MicroentrepreneursListProps = {
	data: Microentrepreneur[];
};

const MicroentrepreneursList = ({ data }: MicroentrepreneursListProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedMicroentrepreneur, setSelectedMicroentrepreneur] =
		useState<Microentrepreneur | null>(null);
	const router = useRouter();

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
				microentrepreneur.businessIdea
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

	const handleDelete = (microentrepreneur: Microentrepreneur) => {
		setSelectedMicroentrepreneur(microentrepreneur);
		setIsModalVisible(true);
	};

	const confirmDelete = () => {
		console.log(
			`Deleting microentrepreneur: ${selectedMicroentrepreneur?.fullName}`
		);
		setIsModalVisible(false);
	};

	const paginatedData = filteredData.slice(
		(currentPage - 1) * 10,
		currentPage * 10
	);

	const columns = columnConfig.map((column) => ({
		title: column.header,
		dataIndex: column.key,
		key: column.key,
		render: (text: string, record: Microentrepreneur) => {
			if (column.isAction) {
				return (
					<div className="flex space-x-2">
						<DeleteOutlined
							onClick={(e) => {
								e.stopPropagation(); // Detener la propagación del evento
								handleDelete(record);
							}}
							className="text-red-500 cursor-pointer"
						/>
						<EyeOutlined
							onClick={(e) => {
								e.stopPropagation(); // Detener la propagación del evento
								router.push(`/microempresaria/${record.id}`);
							}}
							className="text-blue-500 cursor-pointer"
						/>
					</div>
				);
			}
			return text;
		},
	}));

	return (
		<section className="p-3 sm:p-5">
			<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
				<div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="ml-auto flex items-center space-x-2">
							<Input.Search
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								placeholder="Search"
								enterButton
								style={{ width: 200 }}
							/>
							<Button
								type="primary"
								onClick={() => router.push("/nueva-microempresaria")}
							>
								Nueva Microempresaria
							</Button>
						</div>
					</div>
					<Table
						columns={columns}
						dataSource={paginatedData}
						pagination={false}
						onRow={(record) => ({
							onClick: () => {
								router.push(`/microempresaria/${record.id}`);
							},
						})}
					/>
					<Pagination
						current={currentPage}
						total={totalPages * 10}
						pageSize={10}
						onChange={handlePageChange}
					/>
				</div>
			</div>
			<Modal
				title="Confirm Deletion"
				visible={isModalVisible}
				onOk={confirmDelete}
				onCancel={() => setIsModalVisible(false)}
				okText="Delete"
				cancelText="Cancel"
			>
				<p>
					Are you sure you want to delete {selectedMicroentrepreneur?.fullName}?
				</p>
			</Modal>
		</section>
	);
};

export default MicroentrepreneursList;
