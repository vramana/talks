import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getIssues } from "../api";
import Issue from "../components/Issue";
import Pagination from "../components/Pagination";

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

	console.log(data);

	return (
		<div>
			{data
				? data.map((item) => <Issue key={item.id} issue={item} />)
				: undefined}
			<Pagination page={page} setPage={setPage} />
		</div>
	);
}
