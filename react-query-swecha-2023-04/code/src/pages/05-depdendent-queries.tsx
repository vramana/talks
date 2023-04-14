import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";

import { getComments, getIssue, getIssues } from "../api";
import Issue from "../components/Issue";
import Pagination from "../components/Pagination";
import { Outlet, useParams } from "react-router-dom";

export function IssuePage() {
	const { number } = useParams();
	const issue = useQuery({
		queryKey: ["issue", number],
		queryFn: ({ signal }) => getIssue({ number: number as string, signal }),
	});
	const comments = useQuery({
		queryKey: ["comments", number],
		queryFn: ({ signal }) => getComments({ number: number as string, signal }),
		enabled: !!issue.data,
	});

	if (issue.isLoading || comments.isLoading) {
		return <p>Loading...</p>;
	}

	if (issue.error || comments.error) {
		const error = issue.error || comments.error;
		return <p>{(error as Error).message}</p>;
	}

	if (!issue.data) {
		return <p>Issue not found</p>;
	}

	return (
		<>
			<h2>{issue.data.title}</h2>
			<div
				className="border border-solid border-gray-300 rounded-lg p-4"
				dangerouslySetInnerHTML={{ __html: marked(issue.data.body) }}
			/>
			<h3>Comments</h3>
			{comments.data?.map((comment) => (
				<div
					key={comment.id}
					className="border border-solid border-gray-300 rounded-lg p-4 my-2"
				>
					<div>
						Authored by <b>{comment.user.login}</b>
					</div>
					<hr className="bg-color-white" />
					<div dangerouslySetInnerHTML={{ __html: marked(comment.body) }}></div>
				</div>
			))}
		</>
	);
}

export function IssuesPage() {
	const [page, setPage] = useState(1);

	const { data, isLoading, error } = useQuery({
		queryKey: ["issues", page],
		queryFn: ({ signal }) =>
			getIssues({ signal, query: { page: String(page) } }),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{(error as Error).message}</p>;
	}

	return (
		<div>
			{data
				? data.map((item) => <Issue key={item.id} issue={item} enableLink />)
				: undefined}
			<Pagination page={page} setPage={setPage} />
		</div>
	);
}

export function Root() {
	return <Outlet />;
}
