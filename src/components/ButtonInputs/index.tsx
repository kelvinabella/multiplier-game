import React from "react";
import { Group, ActionIcon, TextInput, Paper } from "@mantine/core";
import Image from "next/image";

import classes from "./button-inputs.module.css";
import { useGameContext } from "@/context";

type ButtonInputsType = {
	isReadOnly: boolean;
	label: string;
};

const MULTIPLIER_CHANGE = 0.25;
const POINTS_CHANGE = 25;

export default function ButtonInputs({ isReadOnly, label }: Readonly<ButtonInputsType>) {
	const { player, setPlayer } = useGameContext();

	const increment = () => {
		if (label === "Points") {
			setPlayer((prevState) => ({ ...prevState, points: prevState.points + POINTS_CHANGE }));
		}
		if (label === "Multiplier" && parseFloat(player.multiplier.toString()) < 10) {
			setPlayer((prevState) => ({ ...prevState, multiplier: parseFloat(prevState.multiplier.toString()) + MULTIPLIER_CHANGE }));
		}
	};

	const decrement = () => {
		if (label === "Points" && player.points > 50) {
			setPlayer((prevState) => ({ ...prevState, points: prevState.points - POINTS_CHANGE }));
		}
		if (label === "Multiplier" && parseFloat(player.multiplier.toString()) > 1) {
			setPlayer((prevState) => ({ ...prevState, multiplier: parseFloat(prevState.multiplier.toString()) - MULTIPLIER_CHANGE }));
		}
	};

	return (
		<Paper withBorder shadow="xs" radius="md" p={3} bg="#323638" mb="sm">
			<Group wrap="nowrap" align="flex-end" justify="center">
				<ActionIcon onClick={decrement} variant="outline" color="gray" radius="md" aria-label="minus">
					<Image height={18} width={18} src="/down-arrow.png" alt="down-arrow" />
				</ActionIcon>
				<TextInput
					type="number"
					value={label === "Points" ? player.points : player.multiplier}
					onChange={(event) => {
						if (label === "Multiplier" && parseFloat(event.target.value) > 10) {
							return;
						}
						setPlayer((prevState) => ({ ...prevState, [label.toLowerCase()]: event.target.value }));
					}}
					readOnly={label === "Points" ? isReadOnly : undefined}
					classNames={classes}
					ta="center"
					w="40%"
					size="xs"
					label={label}
				/>
				<ActionIcon onClick={increment} variant="outline" color="gray" radius="md" aria-label="add">
					<Image height={18} width={18} src="/up-arrow.png" alt="up-arrow" />
				</ActionIcon>
			</Group>
		</Paper>
	);
}
