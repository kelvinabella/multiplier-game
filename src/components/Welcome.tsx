import React, { useMemo } from "react";
import { Paper, TextInput, Button, Text } from "@mantine/core";
import { useGameContext } from "@/context";

export default function Welcome() {
	const { player, playersRanking, setPlayer, setIsLoggedIn, setPlayersRanking } = useGameContext();

	const nameValidate = useMemo(() => {
		return player.name ? player.name?.length < 3 : true;
	}, [player.name]);

	const startTheGame = () => {
		setIsLoggedIn(true);
		const currentPlayer = playersRanking.filter((p) => p.name === player.name).length > 0;
		if (!currentPlayer) {
			setPlayersRanking([]);
		}
	};

	return (
		<Paper h={550} withBorder shadow="xs" radius="md" bg="#323638" p="lg">
			<Text ta="center" fz="h2" my={60}>
				Welcome
			</Text>
			<Text fz="xs" c="gray.6" ta="center" mb="md">
				Please Insert Your Name
			</Text>
			<TextInput
				value={player.name}
				onChange={(event) => setPlayer((prevState) => ({ ...prevState, name: event.target.value }))}
				radius="md"
				mb="xs"
				size="md"
			/>
			<Button
				onClick={startTheGame}
				fullWidth
				disabled={nameValidate}
				variant="gradient"
				gradient={{ from: "pink", to: "yellow", deg: 90 }}
				size="md"
				radius="md"
			>
				Accept
			</Button>
		</Paper>
	);
}
