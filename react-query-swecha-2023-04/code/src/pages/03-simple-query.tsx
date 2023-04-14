import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../api";
import Issue from "../components/Issue";

export function IssuesPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["issues"],
		queryFn: ({ signal }) => getIssues({ signal }),
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
				? data.map((item) => <Issue key={item.id} issue={item} />)
				: undefined}
		</div>
	);
}
