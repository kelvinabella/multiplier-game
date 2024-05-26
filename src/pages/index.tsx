import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Container, Grid, SimpleGrid } from "@mantine/core";
import Stats from "@/components/Stats";
import Ranking from "@/components/Ranking";
import Chat from "@/components/Chat";
import ButtonInputs from "@/components/ButtonInputs";
import CurrentRoundStats from "@/components/CurrentRoundStats";
import SpeedController from "@/components/SpeedController";
import Welcome from "@/components/Welcome";
import { useGameContext } from "@/context";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import GameBoard from "@/components/GameBoard";

export default function Index() {
	const { isLoggedIn, gameStarted, player, playersRanking, setGameStarted, setGameEnded, setPlayersData } = useGameContext();

	let socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

	const [chatMessages, setChatMessages] = useState<Array<{ player: string; message: string }>>([]);

	const socketInitializer = async () => {
		await fetch("/api/socket");
		socket.current = io();
		socket.current.on("connect", () => {
			console.log("connected");
		});
		socket?.current?.emit("chat-start", "CHART START");
		socket?.current?.on("chat-message", (msg) => {
			setChatMessages((prevState) => [...prevState, msg]);
		});

		socket?.current?.on("chat-message-bot", (msg) => {
			setChatMessages((prevState) => [...prevState, msg]);
		});
	};

	const setSocketListeners = async () => {
		socket?.current?.emit("game-start", "GAME STARTED");
		socket?.current?.on("game-started", (msg: { autoPlayerData: Array<number> }) => {
			const botData = msg.autoPlayerData.map((m, i) => {
				return { name: `CPU ${i + 1}`, points: player.points, multiplier: m };
			});
			setPlayersData([player, ...botData]);
		});
	};

	useEffect(() => {
		socketInitializer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const playerTotalPoints = useMemo(() => {
		const points = playersRanking.filter((p) => p.name === player.name);
		if (isLoggedIn) return points.length > 0 ? points[0].score : 0;
		else return "";
	}, [isLoggedIn, player.name, playersRanking]);

	return (
		<Container mt={50} fluid maw={1280}>
			<Grid justify="center" align="stretch">
				<Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
					{isLoggedIn ? (
						<>
							<SimpleGrid cols={{ base: 2, sm: 2 }}>
								<ButtonInputs isReadOnly={true} label="Points" />
								<ButtonInputs isReadOnly={false} label="Multiplier" />
							</SimpleGrid>
							<Button
								mb="md"
								onClick={
									gameStarted
										? undefined
										: async () => {
												setGameStarted(true);
												setGameEnded(false);
												setSocketListeners();
										  }
								}
								fullWidth
								variant="gradient"
								gradient={{ from: "pink", to: "yellow", deg: 90 }}
								size="md"
								radius="md"
							>
								{gameStarted ? "Started" : "Start"}
							</Button>
							<CurrentRoundStats />
							<SpeedController />
						</>
					) : (
						<Welcome />
					)}
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
					<Grid gutter="md">
						<Grid.Col>
							<SimpleGrid cols={{ base: 1, sm: 3 }}>
								<Stats label={playerTotalPoints} icon="/rewards.png" />
								<Stats label={isLoggedIn ? player.name : ""} icon="/user.png" />
								<Stats label={isLoggedIn ? "21:30" : ""} icon="/clock.png" />
							</SimpleGrid>
						</Grid.Col>
						<GameBoard />
					</Grid>
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
					<Ranking />
				</Grid.Col>
				<Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
					<Chat chatMessages={chatMessages} socket={socket.current} />
				</Grid.Col>
			</Grid>
		</Container>
	);
}
