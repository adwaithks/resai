import axiosInstance from "../axiosInstance";

export const generateAiReply = async ({
	postContent,
}: {
	postContent: string;
}) => {
	const { data } = await axiosInstance.post("/generate", {
		post_content: postContent,
	});
	return data;
};

export const getPreviousReplies = async () => {
	const { data } = await axiosInstance.get("/reply/all");
	return data;
};

export const getAllUploadedTrainingData = async () => {
	const { data } = await axiosInstance.get("/trainingdata/all");
	return data;
};

export const uploadTrainingData = async () => {};
