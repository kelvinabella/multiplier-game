import { Player } from "@/context";

export const randomPlayerMultiplier = (min: number, max: number) => Array.from({ length: 4 }, () => (Math.random() * (max - min) + min).toFixed(2));

export const randomFreeze = (func: () => void, end: number) => {
	let min = 2,
		max = 10 - end / 10;
	let rand = Math.floor(Math.random() * (max - min + 1) + min);
	setTimeout(func, rand * 1000);
};

export const findWinner = (data: Array<Player>, target: number) =>
	data.reduce((acc, obj) => (Math.abs(target - obj.multiplier) < Math.abs(target - acc.multiplier) ? obj : acc));

export const setRandomInterval = (intervalFunction: () => void, minDelay: number, maxDelay: number) => {
	let timeout: string | number | NodeJS.Timeout | undefined;

	const runInterval = () => {
		const timeoutFunction = () => {
			intervalFunction();
			runInterval();
		};

		const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

		timeout = setTimeout(timeoutFunction, delay);
	};

	runInterval();

	return {
		clear() {
			clearTimeout(timeout);
		},
	};
};
