import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import MyReplies from "./MyReplies";
import KnowledgeBase from "./KnowledgeBase";
import QuickreplyRoundedIcon from "@mui/icons-material/QuickreplyRounded";
import Flex from "./Flex";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import Profile from "./Profile";

const TabView = () => {
	const [value, setValue] = useState("REPLIES");

	const handleChange:
		| ((event: React.SyntheticEvent<Element, Event>, value: string) => void)
		| undefined = (_, newValue) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Box
				sx={{
					position: "sticky",
					backgroundColor: "grey.200",
					top: 10,
					px: 1,
					borderRadius: 1,
				}}
			>
				<Profile />
				<Tabs value={value} onChange={handleChange}>
					<Tab
						value="REPLIES"
						label={
							<Flex>
								<QuickreplyRoundedIcon />
								<Typography
									sx={{ textTransform: "capitalize", ml: 1 }}
								>
									My Replies
								</Typography>
							</Flex>
						}
					/>
					<Tab
						value="KNOWLEDGE"
						label={
							<Flex>
								<StorageRoundedIcon />
								<Typography
									sx={{ textTransform: "capitalize", ml: 1 }}
								>
									Knowledge Base
								</Typography>
							</Flex>
						}
					/>
				</Tabs>
			</Box>

			<Box sx={{ mt: 2 }}>
				{value === "REPLIES" && <MyReplies />}
				{value === "KNOWLEDGE" && <KnowledgeBase />}
			</Box>
		</Box>
	);
};

export default TabView;
