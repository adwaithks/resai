export interface IReplyDTO {
	id: number;
	post: string;
	reply: string;
	platform: string;
	created_on: string;
}

export interface IReply {
	id: number;
	post: string;
	reply: string;
	platform: string;
	createdOn: string;
}

export interface IKnowledgeDTO {
	id: number;
	name: string;
	created_on: string;
}

export interface IKnowledge {
	id: number;
	name: string;
	createdOn: string;
}
