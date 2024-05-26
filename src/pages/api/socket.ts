import { randomPlayerMultiplier, setRandomInterval } from "@/lib";
import { Server } from "socket.io";

const MESSAGES = [
	{ player: "CPU 1", message: "hii" },
	{ player: "CPU 2", message: "hii guysss" },
	{ player: "CPU 3", message: "hii men" },
	{ player: "CPU 4", message: "hello" },
	{ player: "CPU 5", message: "i could play this for hours!" },
	{ player: "CPU 1", message: "i love this game" },
	{ player: "CPU 2", message: "i am winning!" },
	{ player: "CPU 3", message: "hello there" },
	{ player: "CPU 4", message: "hello world" },
	{ player: "CPU 5", message: "hey" },
];
export default async function handler(req: any, res: any) {
	if (res.socket.server.io) {
		console.log("Socket is already running");
	} else {
		console.log("Socket is initializing");
		const io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on("connection", (socket) => {
			socket.on("game-start", (msg) => {
				socket.emit("game-started", { autoPlayerData: randomPlayerMultiplier(1, 10) });
				console.log(msg);
			});

			socket.on("chat-start", (msg) => {
				console.log(msg);
				const interval = setRandomInterval(
					() => {
						socket.emit("chat-message", MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
						console.log(msg);
					},
					3000,
					5000
				);

				setTimeout(() => {
					interval.clear();
				}, 30000);
			});

			socket.on("chat-start-human", (msg) => {
				socket.emit("chat-message-bot", { player: `CPU ${Math.floor(Math.random() * 4 + 1)}`, message: `hey there ${msg}` });
				console.log(msg);
			});
		});
	}
	res.end();
}
