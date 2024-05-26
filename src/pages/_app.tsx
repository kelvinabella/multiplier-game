// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./globals.css";

import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import { GameProvider } from "@/context";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<GameProvider>
				<Component {...pageProps} />
			</GameProvider>
		</MantineProvider>
	);
}
