import React, { useState } from "react";
import { Stack, Group, Paper, Text, Button, TextInput } from "@mantine/core";
import Image from "next/image";
import { useGameContext } from "@/context";

interface ChatType {
	chatMessages: Array<{ player: string; message: string }>;
	socket: any;
}
export default function Chat({ chatMessages, socket }: Readonly<ChatType>) {
	const { isLoggedIn, player } = useGameContext();
	const [message, setMessage] = useState("");

	const sendMessage = () => {
		socket.emit("chat-start-human", player.name);
	};

	return (
		<Stack gap="xs">
			<Group wrap="nowrap">
				<Image height={18} width={18} src="/chat.png" alt="chat" />
				<Text size="md" fw={500}>
					Chat
				</Text>
			</Group>
			<Paper withBorder radius="md" shadow="xs" p={0} bg="#323638" style={{ overflow: "hidden" }}>
				<Stack h={137} m="xs" align="stretch" justify="flex-end" gap="xs">
					{isLoggedIn &&
						chatMessages.map((chat, index) => (
							<Group key={chat.player + index}>
								<Text fz={12} fw={700} variant="gradient" gradient={{ from: "pink", to: "orange", deg: 90 }}>
									{chat.player}:{" "}
								</Text>
								<Text fz={12} fw={500} bg="#787c80" style={{ borderRadius: 3 }} p="1 3">
									{chat.message}
								</Text>
							</Group>
						))}
				</Stack>
				<Group bg="#516976" p={8}>
					<TextInput value={message} onChange={(event) => setMessage(event.currentTarget.value)} size="md" w={{ base: "100%", md: "77%" }} />
					<Button
						onClick={sendMessage}
						variant="gradient"
						w={{ base: "100%", md: "20%" }}
						gradient={{ from: "red", to: "yellow", deg: 90 }}
						size="md"
						radius="md"
					>
						Start
					</Button>
				</Group>
			</Paper>
		</Stack>
	);
}
