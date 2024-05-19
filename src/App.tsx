import TabView from "./components/TabView";
import MainLayout from "./components/MainLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

function App() {
	return (
		<MainLayout>
			<ThemeProvider theme={theme}>
				<TabView />
			</ThemeProvider>
		</MainLayout>
	);
}

export default App;
