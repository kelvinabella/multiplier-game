import { useGameContext } from "@/context";
import { randomFreeze } from "@/lib";
import { Box, Center, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useCountUp } from "use-count-up";

export default function Counter() {
	const { speedController, gameStarted, gameEnded, setGameEnded, setGameStarted, setMultiplierValue } = useGameContext();
	const [colorforText, setColorforText] = useState("white");
	const { value, reset } = useCountUp({
		isCounting: gameStarted,
		decimalPlaces: 2,
		decimalSeparator: ".",
		end: 10,
		duration: 100 - speedController + 2,
	});

	useEffect(() => {
		setMultiplierValue(value as number);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameEnded, setMultiplierValue, value]);

	useEffect(() => {
		if (gameStarted) {
			reset();
			randomFreeze(() => {
				setGameEnded(true);
				setGameStarted(false);
				setColorforText("orange");
			}, speedController);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameStarted]);

	return (
		<Box pos="absolute" mx="auto" w="100%" mt="xl">
			<Center>
				<Group gap={0} justify="center" pos="relative" style={{ zIndex: 200 }}>
					<Text component="span" c={colorforText} fz={70} size="xl" fw={700}>
						{value}
					</Text>
					<Text span fz={70} c={colorforText} size="xl" fw={700}>
						x
					</Text>
				</Group>
			</Center>
		</Box>
	);
}

export function CounterPlacholder() {
	const { gameEnded, multiplierValue } = useGameContext();

	return (
		<Box pos="absolute" mx="auto" w="100%" mt="xl">
			<Center>
				<Group gap={0} justify="center" pos="relative" style={{ zIndex: 200 }}>
					<Text component="span" c="white" fz={70} size="xl" fw={700}>
						{gameEnded ? multiplierValue : "0.00"}
					</Text>
					<Text span fz={70} c="white" size="xl" fw={700}>
						x
					</Text>
				</Group>
			</Center>
		</Box>
	);
}
