import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: "Lato",
	},
	components: {
		MuiTypography: {
			defaultProps: {
				style: {
					letterSpacing: 0.2,
				},
			},
		},
		MuiButton: {
			defaultProps: {
				style: {
					textTransform: "capitalize",
					letterSpacing: 1,
					boxShadow: "none",
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#018224",
		},
	},
});

export default theme;
