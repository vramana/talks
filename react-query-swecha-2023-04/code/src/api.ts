const URL = "https://api.github.com";

export type IIssue = {
	id: number;
	title: string;
	number: number;
	body: string;
	user: {
		login: string;
	};
	pull_request: unknown;
	comments: number;
};

export type IComment = {
	id: number;
	body: string;
	user: {
		login: string;
	};
};

const headers = {
	Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
};

export async function getIssues({
	repo = "facebook/react",
	query,
	signal,
}: {
	repo?: string;
	query?: Record<string, string>;
	signal?: AbortSignal;
}) {
	const res = await fetch(
		URL +
			`/repos/${repo}/issues?${new URLSearchParams({
				...query,
				per_page: "10",
			}).toString()}`,
		{ headers, signal },
	);
	return res.json() as Promise<IIssue[]>;
}

export async function getIssue({
	repo = "facebook/react",
	number,
	signal,
}: {
	repo?: string;
	number: string;
	signal?: AbortSignal;
}) {
	const res = await fetch(URL + `/repos/${repo}/issues/${number}`, {
		headers,
		signal,
	});
	return res.json() as Promise<IIssue>;
}

export async function getComments({
	repo = "facebook/react",
	number,
	signal,
}: {
	repo?: string;
	number: string;
	signal?: AbortSignal;
}) {
	const res = await fetch(URL + `/repos/${repo}/issues/${number}/comments`, {
		headers,
		signal,
	});
	return res.json() as Promise<IComment[]>;
}
