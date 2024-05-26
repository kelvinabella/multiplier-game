import React, { memo, useEffect } from "react";
import { Paper, Group, Table, Text, Stack } from "@mantine/core";
import Image from "next/image";
import { useGameContext } from "@/context";
import { useLocalStorage } from "@mantine/hooks";

const DEFAULT_ELEMENTS = [
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
	{ name: "-", score: "-" },
];

export interface RankingType {
	name: string;
	score: number;
}

function Ranking() {
	const { isLoggedIn, gameEnded, currentRoundWinnings } = useGameContext();
	const [playersRanking, setPlayersRanking] = useLocalStorage<Array<RankingType>>({
		key: "players-ranking",
		defaultValue: [],
	});
	const tableData = isLoggedIn && playersRanking.length > 0 ? playersRanking : DEFAULT_ELEMENTS;

	useEffect(() => {
		if (gameEnded) {
			if (currentRoundWinnings.length > 0) {
				const currentRanking = currentRoundWinnings.map((p) => {
					return { name: p.name, score: p.points };
				});
				if (playersRanking.length === 0) {
					setPlayersRanking(currentRanking.toSorted((a, b) => b.score - a.score));
				} else {
					const totalRanking = currentRanking.reduce((a: RankingType[], c) => {
						const samePlayer = playersRanking.filter((p) => c.name === p.name);
						return [...a, { name: samePlayer[0].name, score: samePlayer[0].score + c.score }];
					}, []);

					setPlayersRanking(totalRanking.toSorted((a, b) => b.score - a.score));
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameEnded, currentRoundWinnings]);

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
