import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMyPreviousRepliesApi } from "../api";
import { IReply } from "../types";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const MyReplies = () => {
	const [replies, setReplies] = useState<IReply[]>([]);
	const [loading, setLoading] = useState("idle");

	useEffect(() => {
		const fetchApi = async () => {
			setLoading("pending");
			const res = await getMyPreviousRepliesApi();
			return res;
		};

		fetchApi()
			.then((data) => {
				setReplies(data);
				setLoading("fulfilled");
			})
			.catch(() => {
				setLoading("rejected");
			});
	}, []);

	if (loading === "pending") return <CircularProgress />;

	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<Typography variant="h6" fontWeight="fontWeightBold">
					Previous Replies
				</Typography>
				<Typography>
					All replies generated by AI for your making your content
					game strong.
				</Typography>
			</Box>

			{replies.map((reply) => {
				return (
					<Box
						sx={{ my: 1, p: 1, backgroundColor: "grey.200" }}
						key={reply.id}
					>
						<Typography>{reply.reply}</Typography>
						<Box
							sx={{
								mt: 1,
								display: "flex",
								alignItems: "center",
							}}
						>
							<Typography sx={{ color: "grey.800" }}>
								{reply.platform}
							</Typography>
							<FiberManualRecordRoundedIcon
								sx={{
									mx: 0.5,
									fontSize: 10,
									color: "grey.800",
								}}
							/>
							<Typography sx={{ color: "grey.800" }}>
								{reply.createdOn}
							</Typography>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};

export default MyReplies;
