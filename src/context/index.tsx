import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import { findWinner } from "@/lib";
import { useLocalStorage } from "@mantine/hooks";

export interface Player {
	name: string;
	points: number;
	multiplier: number;
}

interface Ranking {
	name: string;
	score: number;
}

interface ContextType {
	player: Player;
	speedController: number;
	multiplierValue: number;
	isLoggedIn: boolean;
	gameStarted: boolean;
	gameEnded: boolean;
	playersData: Array<Player>;
	playersRanking: Array<Ranking>;
	currentRoundWinnings: Array<Player>;
	setPlayer: Dispatch<SetStateAction<Player>>;
	setGameStarted: Dispatch<SetStateAction<boolean>>;
	setGameEnded: Dispatch<SetStateAction<boolean>>;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	setSpeedController: Dispatch<SetStateAction<number>>;
	setMultiplierValue: Dispatch<SetStateAction<number>>;
	setPlayersData: Dispatch<SetStateAction<Array<Player>>>;
	setPlayersRanking: Dispatch<SetStateAction<Array<Ranking>>>;
}

const GameContext = createContext<ContextType | null>(null);

export function GameProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [player, setPlayer] = useState<Player>({ name: "", points: 50, multiplier: 1.0 });
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [gameEnded, setGameEnded] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [speedController, setSpeedController] = useState(0);
	const [multiplierValue, setMultiplierValue] = useState<number>(1);
	const [playersData, setPlayersData] = useState<Array<Player>>([]);
	const [currentRoundWinnings, setCurrentRoundWinnings] = useState<Array<Player>>([]);
	const [playersRanking, setPlayersRanking] = useLocalStorage<Array<Ranking>>({
		key: "players-ranking",
		defaultValue: [],
	});

	useEffect(() => {
		if (gameEnded) {
			const winner = findWinner(playersData, multiplierValue);
			const currentRoundData = playersData.map((p, i) => {
				if (winner.name === p.name) {
					return { name: p.name, points: parseFloat((p.points * p.multiplier).toFixed(2)), multiplier: p.multiplier };
				}
				return { name: p.name, points: 0, multiplier: p.multiplier };
			});
			setCurrentRoundWinnings(currentRoundData);

			if (currentRoundData.length > 0) {
				const currentRanking = currentRoundData.map((p) => {
					return { name: p.name, score: p.points };
				});
				if (playersRanking.length === 0) {
					setPlayersRanking(currentRanking.toSorted((a, b) => b.score - a.score));
				} else {
					const totalRanking = currentRanking.reduce((a: Ranking[], c) => {
						const samePlayer = playersRanking.filter((p) => c.name === p.name);
						return [...a, { name: samePlayer[0].name, score: samePlayer[0].score + c.score }];
					}, []);

					setPlayersRanking(totalRanking.toSorted((a, b) => b.score - a.score));
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameEnded, multiplierValue]);

	const value = useMemo(
		() => ({
			player,
			speedController,
			multiplierValue,
			gameStarted,
			gameEnded,
			isLoggedIn,
			playersData,
			playersRanking,
			currentRoundWinnings,
			setIsLoggedIn,
			setPlayer,
			setMultiplierValue,
			setGameStarted,
			setGameEnded,
			setPlayersData,
			setSpeedController,
			setPlayersRanking,
		}),
		[
			player,
			speedController,
			multiplierValue,
			gameStarted,
			gameEnded,
			isLoggedIn,
			playersData,
			playersRanking,
			currentRoundWinnings,
			setPlayersRanking,
		]
	);

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
	const currentGameContext = useContext(GameContext);

	if (!currentGameContext) {
		throw new Error("useGameContext has to be used within <GameContext.Provider>");
	}

	return currentGameContext;
};
