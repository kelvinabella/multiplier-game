import Chart from "@/components/Chart";
import Counter, { CounterPlacholder } from "@/components/Counter";
import { useGameContext } from "@/context";
import { Grid, Paper } from "@mantine/core";
import React from "react";

export default function GameBoard() {
	const { gameStarted } = useGameContext();
	return (
		<Grid.Col pos="relative">
			{gameStarted ? <Counter /> : <CounterPlacholder />}
			<Paper withBorder pos="relative" top={0} radius="md" shadow="xs" p="xs" bg="#323638">
				<Chart />
			</Paper>
		</Grid.Col>
	);
}
