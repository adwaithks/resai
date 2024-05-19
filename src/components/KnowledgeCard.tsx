import { Box, Button, CircularProgress, Typography } from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FolderZipRoundedIcon from "@mui/icons-material/FolderZipRounded";
import { useState } from "react";
import { deleteKnowledgeApi } from "../api";
import { IKnowledge } from "../types";

const KnowledgeCard = ({
	knowledge,
	removeKnowledge,
}: {
	knowledge: IKnowledge;
	removeKnowledge: (id: number) => void;
}) => {
	const [deleteStatus, setDeleteStatus] = useState("idle");

	return (
		<Box
			sx={{
				my: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
			key={knowledge.id}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<FolderZipRoundedIcon
					color="primary"
					sx={{ mr: 1, fontSize: 40 }}
				/>
				<Typography>{knowledge.name}</Typography>
				<FiberManualRecordRoundedIcon
					color="disabled"
					sx={{ mx: 0.5, fontSize: 10 }}
				/>
				<Typography color="GrayText">{knowledge.createdOn}</Typography>
			</Box>
			<Box>
				<Button
					disabled={deleteStatus === "pending"}
					onClick={async () => {
						setDeleteStatus("pending");
						try {
							await deleteKnowledgeApi({
								knowledgeId: knowledge.id,
							});
							setDeleteStatus("fulfilled");
							removeKnowledge(knowledge.id);
						} catch {
							setDeleteStatus("rejected");
						}
					}}
				>
					{deleteStatus === "pending" ? (
						<CircularProgress sx={{ fontSize: 15 }} />
					) : (
						<DeleteRoundedIcon color="error" />
					)}
				</Button>
			</Box>
		</Box>
	);
};

export default KnowledgeCard;
