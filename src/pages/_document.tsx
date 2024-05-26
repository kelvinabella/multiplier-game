import { Head, Html, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
	return (
		<Html lang="en">
			<title>Multiplier Game</title>
			<Head>
				<ColorSchemeScript defaultColorScheme="dark" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
