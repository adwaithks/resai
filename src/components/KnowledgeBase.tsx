import { Box, CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IKnowledge } from "../types";
import { getAllKnowledgeApi } from "../api";
import FileUpload from "./FileUpload";
import KnowledgeCard from "./KnowledgeCard";
import Flex from "./Flex";

const KnowledgeBase = () => {
	const [knowledges, setKnowledges] = useState<IKnowledge[]>([]);
	const [loading, setLoading] = useState("idle");

	const removeKnowledge = useCallback(
		(id: number) => {
			setKnowledges([...knowledges].filter((kn) => kn.id !== id));
		},
		[knowledges]
	);

	const addKnowledge = useCallback(
		(knowledge: IKnowledge) => {
			setKnowledges((prev) => [...prev, knowledge]);
		},
		[setKnowledges]
	);

	useEffect(() => {
		const fetchApi = async () => {
			setLoading("pending");
			const res = await getAllKnowledgeApi();
			return res;
		};

		fetchApi()
			.then((data) => {
				setKnowledges(data);
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
					Add Knowledge Bases
				</Typography>
				<Typography>
					Add text files of your previous conversations to get replies
					that has your personal touch.
				</Typography>
			</Box>

			<FileUpload addKnowledge={addKnowledge} />

			{knowledges.length === 0 && (
				<Flex sx={{ mt: 2 }}>
					<Typography color="gray">
						You haven't uploaded any knowledge bases
					</Typography>
				</Flex>
			)}

			<Box sx={{ mt: 2 }}>
				{knowledges.map((knowledge) => {
					return (
						<KnowledgeCard
							key={knowledge.id}
							knowledge={knowledge}
							removeKnowledge={removeKnowledge}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default KnowledgeBase;
