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

export function makeKeys<T extends string>(resource: T) {
	return {
		all: [resource],
		lists: [resource, "list"] as const,
		list: (params: unknown) => [resource, "list", params] as const,
		details: [resource, "detail"] as const,
		detail: (id: number | string) => [resource, "detail", id] as const,
	};
}

const makeHeaders = () => {
	const token = localStorage.getItem("github_token");

	return {
		Authorization: `Bearer ${token || import.meta.env.VITE_TOKEN}`,
	};
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
		{ headers: makeHeaders(), signal },
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
		headers: makeHeaders(),
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
		headers: makeHeaders(),
		signal,
	});
	return res.json() as Promise<IComment[]>;
}

export async function createComment({
	repo = "facebook/react",
	number,
	body,
	signal,
}: {
	repo?: string;
	number: string;
	body: string;
	signal?: AbortSignal;
}) {
	const res = await fetch(URL + `/repos/${repo}/issues/${number}/comments`, {
		method: "POST",
		headers: {
			...makeHeaders(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ body }),
		signal,
	});
	return res.json() as Promise<IComment>;
}
