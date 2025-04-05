export type CommentType = {
	id: number;
	content: string;
	created: string;
	user: {
		id: number;
		name: string;
		username: string;
	};
};

export type PostType = {
	id: number;
	content: string;
	created: string;
	comments: CommentType[];
	user: {
		name: string;
		username: string;
		bio: string;
	};
};
