import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { findWinner } from "@/lib";
export interface Player {
	name: string;
	points: number;
	multiplier: number;
}

interface ContextType {
	player: Player;
	speedController: number;
	multiplierValue: MutableRefObject<number>;
	isLoggedIn: boolean;
	gameStarted: boolean;
	gameEnded: boolean;
	playersData: Array<Player>;
	currentRoundWinnings: Array<Player>;
	setPlayer: Dispatch<SetStateAction<Player>>;
	setGameStarted: Dispatch<SetStateAction<boolean>>;
	setGameEnded: Dispatch<SetStateAction<boolean>>;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	setSpeedController: Dispatch<SetStateAction<number>>;
	setPlayersData: Dispatch<SetStateAction<Array<Player>>>;
}

const GameContext = createContext<ContextType | null>(null);

export function GameProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [player, setPlayer] = useState<Player>({ name: "", points: 50, multiplier: 1.0 });
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [gameEnded, setGameEnded] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [speedController, setSpeedController] = useState(0);
	const multiplierValue = useRef<number>(1);
	const [playersData, setPlayersData] = useState<Array<Player>>([]);
	const [currentRoundWinnings, setCurrentRoundWinnings] = useState<Array<Player>>([]);

	useEffect(() => {
		if (gameEnded) {
			const winner = findWinner(playersData, multiplierValue.current);
			const currentRoundData = playersData.map((p, i) => {
				if (winner.name === p.name) {
					return { name: p.name, points: parseFloat((p.points * p.multiplier).toFixed(2)), multiplier: p.multiplier };
				}
				return { name: p.name, points: 0, multiplier: p.multiplier };
			});
			setCurrentRoundWinnings(currentRoundData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameEnded]);

	const value = useMemo(
		() => ({
			player,
			speedController,
			multiplierValue,
			gameStarted,
			gameEnded,
			isLoggedIn,
			playersData,
			currentRoundWinnings,
			setIsLoggedIn,
			setPlayer,
			setGameStarted,
			setGameEnded,
			setPlayersData,
			setSpeedController,
		}),
		[player, speedController, multiplierValue, gameStarted, gameEnded, isLoggedIn, playersData, currentRoundWinnings]
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
