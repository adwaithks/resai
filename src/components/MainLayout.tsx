import { Box } from "@mui/material";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return <Box sx={{ p: 1 }}>{children}</Box>;
};

export default MainLayout;
