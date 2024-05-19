import axiosInstance from "../axiosInstance";
import { IKnowledge, IKnowledgeDTO, IReply, IReplyDTO } from "../types";

export const generateAiReplyApi = async ({
	postContent,
}: {
	postContent: string;
}) => {
	const { data } = await axiosInstance.post("/services/generate", {
		post_content: postContent,
	});
	return data;
};

export const getMyPreviousRepliesApi = async () => {
	const { data } = await axiosInstance.get<{ data: IReplyDTO[] }>(
		"/services/reply/all"
	);
	return data.data.map((d) => {
		return {
			id: d.id,
			post: d.post,
			reply: d.reply,
			platform: d.platform,
			createdOn: d.created_on,
		} as IReply;
	});
};

export const getAllKnowledgeApi = async () => {
	const { data } = await axiosInstance.get<{ data: IKnowledgeDTO[] }>(
		"/services/knowledge/all"
	);
	return data.data.map((d) => {
		return {
			id: d.id,
			createdOn: d.created_on,
			name: d.name,
		} as IKnowledge;
	});
};

export const deleteKnowledgeApi = async ({
	knowledgeId,
}: {
	knowledgeId: number;
}) => {
	await axiosInstance.post<{ data: IKnowledgeDTO[] }>(
		"/services/knowledge/delete",
		{
			knowledge_id: knowledgeId,
		}
	);
};

export const uploadTrainingDataApi = async () => {};
