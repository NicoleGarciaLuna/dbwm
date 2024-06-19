import { useMemo } from "react";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Microentrepreneur } from "../types";
import Table from "./Table";
import { columnConfig } from "../data/columnConfig";

type MicroentrepreneursTableProps = {
	data: Microentrepreneur[];
};

const MicroentrepreneursTable = ({ data }: MicroentrepreneursTableProps) => {
	const columnHelper = createColumnHelper<Microentrepreneur>();

	const columns = useMemo(
		() =>
			columnConfig.map((column) =>
				column.isAction
					? columnHelper.display({
							id: column.key,
							header: column.header,
							cell: () => <button className="text-blue-500">Action</button>,
					  })
					: columnHelper.accessor(column.key as keyof Microentrepreneur, {
							header: column.header,
							cell: (info) => info.getValue(),
					  })
			),
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
