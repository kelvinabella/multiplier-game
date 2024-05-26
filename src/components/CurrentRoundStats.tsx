import React, { memo } from "react";
import { Paper, Group, Table, Text, Stack } from "@mantine/core";
import Image from "next/image";
import { useGameContext } from "@/context";

function CurrentRoundStats() {
	const { player, gameStarted, gameEnded, currentRoundWinnings, playersData } = useGameContext();

	const DEFAULT_DATA = [
		{ name: player.name, points: "-", multiplier: "-" },
		{ name: "CPU 1", points: "-", multiplier: "-" },
		{ name: "CPU 2", points: "-", multiplier: "-" },
		{ name: "CPU 3", points: "-", multiplier: "-" },
		{ name: "CPU 4", points: "-", multiplier: "-" },
	];

	let playerTableData;
	if (gameStarted) {
		playerTableData = playersData;
	} else if (gameEnded) {
		playerTableData = currentRoundWinnings;
	} else {
		playerTableData = DEFAULT_DATA;
	}

	const rows = playerTableData.map((element) => (
		<Table.Tr key={element.name}>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td ta="center">{element.points}</Table.Td>
			<Table.Td ta="center">{element.multiplier}</Table.Td>
		</Table.Tr>
	));
	return (
		<Stack gap="xs" mb="md">
			<Group wrap="nowrap">
				<Image height={18} width={18} src="/trophy.png" alt="trophy" />
				<Text size="md" fw={500}>
					Current Round
				</Text>
			</Group>
			<Paper h={215} radius="md" shadow="xs" p="xs">
				<Table striped highlightOnHover verticalSpacing={5} horizontalSpacing="xl">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Name</Table.Th>
							<Table.Th ta="center">Point</Table.Th>
							<Table.Th ta="center">Multiplier</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Paper>
		</Stack>
	);
}

export default memo(CurrentRoundStats);
