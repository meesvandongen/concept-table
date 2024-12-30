import { ActionIcon, Menu, rem, useMantineColorScheme } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { download, generateCsv, mkConfig } from "export-to-csv"; //or use your library of choice here

import {
	IconBrandGithub,
	IconDots,
	IconMoon,
	IconSun,
	IconSunMoon,
} from "@tabler/icons-react";
import type { MRT_Row, MRT_TableInstance } from "mantine-react-table";
import type { UnlConcept } from "../api/api";

const csvConfig = mkConfig({
	fieldSeparator: ",",
	decimalSeparator: ".",
	useKeysAsHeaders: true,
});

export function MainMenu({
	table,
}: {
	table: MRT_TableInstance<UnlConcept>;
}) {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	const handleExportRows = (rows: MRT_Row<UnlConcept>[]) => {
		const rowData = rows.map((row) => row.original);
		const csv = generateCsv(csvConfig)(rowData as { [key: string]: any }[]);
		download(csvConfig)(csv);
	};

	return (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon
					color="gray"
					size="lg"
					variant="subtle"
					style={{
						marginRight: "auto",
					}}
				>
					<IconDots />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					leftSection={
						<IconBrandGithub style={{ width: rem(14), height: rem(14) }} />
					}
					component="a"
					href="https://github.com/meesvandongen/concept-table"
					target="_blank"
				>
					Github
				</Menu.Item>

				<Menu.Divider />

				<Menu.Label>Theme</Menu.Label>
				<Menu.Item
					onClick={() => setColorScheme("dark")}
					leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
					color={colorScheme === "dark" ? "blue" : undefined}
				>
					Dark
				</Menu.Item>
				<Menu.Item
					leftSection={<IconSun style={{ width: rem(14), height: rem(14) }} />}
					onClick={() => setColorScheme("light")}
					color={colorScheme === "light" ? "blue" : undefined}
				>
					Light
				</Menu.Item>
				<Menu.Item
					leftSection={
						<IconSunMoon style={{ width: rem(14), height: rem(14) }} />
					}
					onClick={() => setColorScheme("auto")}
					color={colorScheme === "auto" ? "blue" : undefined}
				>
					Auto
				</Menu.Item>

				<Menu.Divider />

				<Menu.Item
					disabled={table.getPrePaginationRowModel().rows.length === 0}
					//export all rows, including from the next page, (still respects filtering and sorting)
					onClick={() =>
						handleExportRows(table.getPrePaginationRowModel().rows)
					}
					leftSection={<IconDownload />}
				>
					Export All Rows
				</Menu.Item>
				<Menu.Item
					disabled={
						!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
					}
					//only export selected rows
					onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
					leftSection={<IconDownload />}
				>
					Export Selected Rows
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
