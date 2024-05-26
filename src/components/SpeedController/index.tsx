import React from "react";
import { Paper, Group, Text, Stack, Slider } from "@mantine/core";
import Image from "next/image";
import { useGameContext } from "@/context";

import classes from "./speed-controller.module.css";

export default function SpeedController() {
	const { gameStarted, speedController, setSpeedController } = useGameContext();
	return (
		<Stack gap="xs">
			<Group wrap="nowrap">
				<Image height={24} width={24} src="/timer.png" alt="timer" />
				<Text size="md" fw={500}>
					Speed
				</Text>
			</Group>
			<Paper withBorder radius="md" shadow="xs" p="25 10" bg="#323638">
				<Slider
					disabled={gameStarted}
					classNames={classes}
					value={speedController}
					onChange={setSpeedController}
					color="orange"
					label={null}
					thumbSize={17}
					size="xs"
					marks={[
						{ value: 0, label: "1x" },
						{ value: 25, label: "2x" },
						{ value: 50, label: "3x" },
						{ value: 75, label: "4x" },
						{ value: 100, label: "5x" },
					]}
				/>
			</Paper>
		</Stack>
	);
}
