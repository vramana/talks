import { useState, useContext, createContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { marked } from "marked";

const RepoContext = createContext<string>("");

import { createComment, getComments, getIssue, getIssues } from "../api";
import Issue from "../components/Issue";
import Pagination from "../components/Pagination";
import { Outlet, useParams } from "react-router-dom";

export function NewComment() {
	const [comment, setComment] = useState("");
	const { number } = useParams();
	const repo = useContext(RepoContext);

	const { mutate, isLoading, error } = useMutation({
		mutationFn: () =>
			createComment({ repo, number: number as string, body: comment }),
		onSuccess: () => {
			setComment("");
		},
	});

	return (
		<div className="border border-solid border-gray-300 rounded-lg p-4 my-2">
			<div>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>
			<div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => mutate()}
					disabled={isLoading}
				>
					{isLoading ? "Submitting..." : "Submit"}
				</button>
			</div>
			{error ? <p>{(error as Error).message}</p> : undefined}
		</div>
	);
}

export function IssuePage() {
	const { number } = useParams();
	const repo = useContext(RepoContext);

	const issue = useQuery({
		queryKey: ["issue", number],
		queryFn: ({ signal }) =>
			getIssue({ repo, number: number as string, signal }),
	});
	const comments = useQuery({
		queryKey: ["comments", number],
		queryFn: ({ signal }) =>
			getComments({ repo, number: number as string, signal }),
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
	const repo = useContext(RepoContext);

	const { data, isLoading, error } = useQuery({
		queryKey: ["issues", page],
		queryFn: ({ signal }) =>
			getIssues({ repo, signal, query: { page: String(page) } }),
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
	const [text, setText] = useState("facebook/react");
	const [repo, setRepo] = useState("facebook/react");

	return (
		<div>
			<div className="flex justify-between">
				<input value={text} onChange={(e) => setText(e.target.value)} />
				<button onClick={() => setRepo(text)}>Go</button>
			</div>
			<RepoContext.Provider value={repo}>
				<Outlet />
			</RepoContext.Provider>
		</div>
	);
}
