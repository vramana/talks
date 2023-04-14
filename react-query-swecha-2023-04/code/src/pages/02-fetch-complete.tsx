import { useEffect, useState } from "react";
import { getIssues, type IIssue } from "../api";

import Issue from "../components/Issue";

export function IssuesPage() {
	const [data, setData] = useState<IIssue[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error>();

	useEffect(() => {
		const abortController = new AbortController();
		getIssues({ signal: abortController.signal })
			.then((data) => {
				setData(data);
				setError(undefined);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error);
				setData(undefined);
				setIsLoading(false);
			});
		return () => {
			abortController.abort();
		};
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<div>
			{data
				? data.map((item) => <Issue key={item.id} issue={item} />)
				: undefined}
		</div>
	);
}
