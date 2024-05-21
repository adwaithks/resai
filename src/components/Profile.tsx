import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMyProfileApi } from "../api";
import { IUser } from "../types";

const Profile = () => {
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		getMyProfileApi()
			.then((data) => {
				setUser(data);
			})
			.catch(() => {});
	}, []);

	return (
		<Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
			<Avatar src={user?.imageUrl} sx={{ mr: 1 }} />
			<Box>
				<Typography>{user?.name}</Typography>
				<Typography>{user?.email}</Typography>
			</Box>
		</Box>
	);
};

export default Profile;
