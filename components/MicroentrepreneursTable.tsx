"use client";
import { useMemo } from "react";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Microentrepreneur } from "../types";
import Table from "./Table";

type MicroentrepreneursTableProps = {
	data: Microentrepreneur[];
};

const MicroentrepreneursTable = ({ data }: MicroentrepreneursTableProps) => {
	const columnHelper = createColumnHelper<Microentrepreneur>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("firstName", {
				cell: (info) => info.getValue(),
				header: "First Name",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("lastName", {
				cell: (info) => <i>{info.getValue()}</i>,
				header: "Last Name",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("age", {
				header: "Age",
				cell: (info) => info.renderValue(),
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("visits", {
				header: "Visits",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("status", {
				header: "Status",
				footer: (info) => info.column.id,
			}),
			columnHelper.accessor("progress", {
				header: "Profile Progress",
				footer: (info) => info.column.id,
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return <Table table={table} />;
};

export default MicroentrepreneursTable;
