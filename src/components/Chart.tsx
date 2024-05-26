import { useGameContext } from "@/context";
import { randomFreeze } from "@/lib";
import { Box, Center, Group, Paper, Stack, Text } from "@mantine/core";
import { useAnimate } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useCountUp } from "use-count-up";

function ChartWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<Paper withBorder pos="relative" top={0} radius="md" shadow="xs" p="xs" bg="#323638">
			<Stack gap={0} h={460} justify="space-between">
				{children}
				<Group grow style={{ borderTop: "1px solid gray" }} pt="lg">
					<Text>1</Text>
					<Text>2</Text>
					<Text>3</Text>
					<Text>4</Text>
					<Text>5</Text>
					<Text>6</Text>
					<Text>7</Text>
					<Text>8</Text>
					<Text>9</Text>
					<Text>10</Text>
				</Group>
			</Stack>
		</Paper>
	);
}

export default function Chart() {
	const { speedController, gameStarted, multiplierValue, gameEnded, setGameEnded, setGameStarted } = useGameContext();
	const [colorforText, setColorforText] = useState("white");
	const { value, reset } = useCountUp({
		isCounting: gameStarted,
		decimalPlaces: 2,
		decimalSeparator: ".",
		end: 10,
		duration: 100 - speedController + 2,
	});

	useEffect(() => {
		multiplierValue.current = value as number;
		animate(scope.current, { pathLength: ((value as number) / 10).toFixed(2) }, { duration: 1, ease: "easeInOut" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameEnded, value]);

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

	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (gameStarted) {
			animate(scope.current, { pathLength: 0 }, { duration: 1, ease: "linear" });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameStarted]);

	return (
		<>
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
			<ChartWrapper>
				{(gameStarted || gameEnded) && (
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
						<path
							ref={scope}
							d="M9.417040057246368 380.2690704670732C9.417040057246368 380.2690704670732 27.354261584345977 378.4753387776201 27.354261584345977 378.4753387776201C27.354261584345977 378.4753387776201 80.26905650622098 375.78475650222947 80.26905650622098 375.78475650222947C80.26905650622098 375.78475650222947 127.80268687731473 374.88790591629197 127.80268687731473 374.88790591629197C127.80268687731473 374.88790591629197 160.9865400267288 372.19732364090135 160.9865400267288 372.19732364090135C160.9865400267288 372.19732364090135 204.93273753649441 368.6098602619951 204.93273753649441 368.6098602619951C204.93273753649441 368.6098602619951 242.60088939196316 365.91927798660447 242.60088939196316 365.91927798660447C242.60088939196316 365.91927798660447 298.2062665892288 364.12554629715135 298.2062665892288 364.12554629715135C298.2062665892288 364.12554629715135 329.5964033079788 362.33184512527635 329.5964033079788 362.33184512527635C329.5964033079788 362.33184512527635 378.92376536852566 353.36321719558885 378.92376536852566 353.36321719558885C378.92376536852566 353.36321719558885 429.14797801501004 344.39461978347947 429.14797801501004 344.39461978347947C429.14797801501004 344.39461978347947 473.99102611071316 337.2197235432451 473.99102611071316 337.2197235432451C473.99102611071316 337.2197235432451 510.7623273802444 328.2511261311357 510.7623273802444 328.2511261311357C510.7623273802444 328.2511261311357 559.1928083372757 305.8295868244951 559.1928083372757 305.8295868244951C559.1928083372757 305.8295868244951 595.0672590208694 287.8923614826982 595.0672590208694 287.8923614826982C595.0672590208694 287.8923614826982 630.0448591185257 261.8834198323076 630.0448591185257 261.8834198323076C630.0448591185257 261.8834198323076 668.6098615599319 229.59641726883103 668.6098615599319 229.59641726883103C668.6098615599319 229.59641726883103 702.6906110716507 203.58744510086228 702.6906110716507 203.58744510086228C702.6906110716507 203.58744510086228 733.1838361693069 171.30044253738572 733.1838361693069 171.30044253738572C733.1838361693069 171.30044253738572 757.3991071654007 143.4977539387529 757.3991071654007 143.4977539387529C757.3991071654007 143.4977539387529 778.9237653685257 99.55157168777635 778.9237653685257 99.55157168777635C778.9237653685257 99.55157168777635 784.3049299193069 67.26457675369431 784.3049299193069 67.26457675369431C784.3049299193069 67.26457675369431 785.2017805052444 44.843048891145486 785.2017805052444 44.843048891145486C785.2017805052444 44.843048891145486 785.2017805052444 28.69955142410447 785.2017805052444 28.69955142410447 "
							strokeWidth="5"
							fill="transparent"
							stroke="orange"
							strokeLinecap="round"
						/>
					</svg>
				)}
			</ChartWrapper>
		</>
	);
}

export function ChartPlacholder() {
	const { gameEnded, multiplierValue } = useGameContext();

	return (
		<ChartWrapper>
			<Box pos="relative" mx="auto" w="100%" mt="lg" right={-8} top={1}>
				<Center>
					<Group gap={0} justify="center" pos="relative" style={{ zIndex: 200 }}>
						<Text component="span" c={gameEnded ? "orange" : "white"} fz={70} size="xl" fw={700}>
							{gameEnded ? multiplierValue.current : "0.00"}
						</Text>
						<Text span fz={70} c={gameEnded ? "orange" : "white"} size="xl" fw={700}>
							x
						</Text>
					</Group>
				</Center>
			</Box>
		</ChartWrapper>
	);
}
