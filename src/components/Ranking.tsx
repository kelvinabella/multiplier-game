import React, { memo } from "react";
import { Paper, Group, Table, Text, Stack } from "@mantine/core";
import Image from "next/image";
import { useGameContext } from "@/context";

const DEFAULT_ELEMENTS = [
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
];

function Ranking() {
	const { isLoggedIn, playersRanking } = useGameContext();

	const tableData = isLoggedIn && playersRanking.length > 0 ? playersRanking : DEFAULT_ELEMENTS;

	const rows = tableData.map((element, i) => (
		<Table.Tr key={element.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td ta="center">{element.name}</Table.Td>
			<Table.Td ta="center">{element.score}</Table.Td>
		</Table.Tr>
	));
	return (
		<Stack gap="xs">
			<Group wrap="nowrap">
				<Image height={18} width={18} src="/ranking.png" alt="ranking" />
				<Text size="md" fw={500}>
					Ranking
				</Text>
			</Group>
			<Paper withBorder radius="md" shadow="xs" p="xs" bg="#323638">
				<Table striped highlightOnHover verticalSpacing={5} horizontalSpacing="xl">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>No.</Table.Th>
							<Table.Th ta="center">Name</Table.Th>
							<Table.Th ta="center">Score</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Paper>
		</Stack>
	);
}

export default memo(Ranking);
