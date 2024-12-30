import {
	type MRT_ColumnDef,
	type MRT_Row,
	MantineReactTable,
	useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import type { UnlConcept } from "./api/api";
import { useDict } from "./api/query";
import { MainMenu } from "./components/main-menu";

export default function App() {
	const { data, isLoading } = useDict();

	console.log(data);

	const columns = useMemo<MRT_ColumnDef<UnlConcept>[]>(() => {
		return [
			{
				header: "Lemma",
				accessorKey: "lemma",
			},
			{
				accessorKey: "gloss_comment",
				header: "Comment",
				Cell: ({ row }) => (
					<span title={row.original.gloss_comment}>
						{row.original.gloss_comment}
					</span>
				),
			},
			{
				accessorKey: "gloss_example",
				header: "Example",
				Cell: ({ row }) => (
					<span title={row.original.gloss_example}>
						{row.original.gloss_example}
					</span>
				),
			},
			{
				accessorKey: "links",
				header: "Links",
			},
			{
				accessorKey: "uw",
				header: "UW",
			},
			{
				accessorKey: "part_of_speech",
				header: "Part of Speech",
				filterVariant: "select",
				filterFn: "equals",
			},
		];
	}, []);

	const table = useMantineReactTable({
		data: data ?? [],
		columns,
		state: {
			isLoading: isLoading,
			density: "xs",
		},
		initialState: {
			showColumnFilters: true,
			showGlobalFilter: true,
		},
		positionGlobalFilter: "left",
		enableDensityToggle: false,
		enablePagination: false,
		enableFullScreenToggle: false,

		enableRowVirtualization: true,
		enableStickyHeader: true,
		enableColumnDragging: true,
		enableColumnOrdering: true,
		enableColumnPinning: true,
		enableFacetedValues: true,
		enableColumnFilterModes: true,
		enableGlobalFilterModes: true,
		enableGrouping: true,
		enableRowSelection: true,
		enableBottomToolbar: false,

		mantinePaperProps: {
			withBorder: false,
			style: {
				height: "100vh",
			},
		},
		mantineTableContainerProps: {
			style: {
				height: "100%",
			},
		},

		renderTopToolbarCustomActions: ({ table }) => <MainMenu table={table} />,
	});

	return (
		<main>
			<MantineReactTable table={table} />
		</main>
	);
}
