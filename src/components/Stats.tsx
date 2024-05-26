import { Paper, Group, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

interface StatsType {
	label: string | number;
	icon: string;
}

export default function Stats({ label, icon }: Readonly<StatsType>) {
	return (
		<Paper withBorder shadow="xs" radius="md" p="xs" bg="#323638">
			<Group wrap="nowrap" gap="lg">
				<Image height={32} width={32} src={icon} alt={icon} />
				<Text w="65%" ta="center" size="md" fw={500}>
					{label}
				</Text>
			</Group>
		</Paper>
	);
}
