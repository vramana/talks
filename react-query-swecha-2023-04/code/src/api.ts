const URL = "https://api.github.com";

export type IIssue = {
	id: number;
	title: string;
	number: number;
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
		URL + `/repos/${repo}/issues?${new URLSearchParams(query).toString()}`,
		{ headers, signal },
	);
	return res.json() as Promise<IIssue[]>;
}
