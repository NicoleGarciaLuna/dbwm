"use client";
import { useState, useMemo, useEffect } from "react";
import { Table, Pagination, Input, Modal, Button } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
	fetchPersonasConDatos,
	PersonasConDatos,
} from "@/utils/api/fetchTable";

type Microentrepreneur = {
	id: number;
	fullName: string;
	company: string;
	sector: string;
	businessIdea: string;
	experienceYears: string;
};

const columnConfig = [
	{ key: "fullName", header: "Nombre Completo" },
	{ key: "company", header: "Empresa" },
	{ key: "sector", header: "Sector" },
	{ key: "businessIdea", header: "Idea de Negocio" },
	{ key: "experienceYears", header: "Años de Experiencia" },
	{ key: "actions", header: "Acciones", isAction: true },
];

const MicroentrepreneursList = () => {
	const [data, setData] = useState<Microentrepreneur[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedMicroentrepreneur, setSelectedMicroentrepreneur] =
		useState<Microentrepreneur | null>(null);
	const router = useRouter();

	useEffect(() => {
		const getData = async () => {
			const personas: PersonasConDatos | null = await fetchPersonasConDatos();
			console.log("Datos recibidos de Supabase:", personas);

			if (personas) {
				const formattedData = personas.map((persona) => {
					const diagnostico = persona.diagnostico?.[0];
					const emprendimiento = diagnostico?.emprendimiento;
					const ideaNegocio = diagnostico?.idea_negocio;

					return {
						id: persona.id_persona,
						fullName: `${persona.nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`,
						company: emprendimiento?.nombre_emprendimiento ?? "",
						sector: emprendimiento?.sector_economico ?? "",
						businessIdea: ideaNegocio?.descripcion_breve ?? "",
						experienceYears: emprendimiento?.tiempo_operacion ?? "",
					};
				});
				setData(formattedData);
				console.log("Datos formateados:", formattedData);
			}
		};

		getData();
	}, []);

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
