import { Box, SxProps } from "@mui/material";
import React from "react";

const Flex = ({
	children,
	sx,
}: {
	children: React.ReactNode;
	sx?: SxProps;
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				...sx,
			}}
		>
			{children}
		</Box>
	);
};

export default Flex;
