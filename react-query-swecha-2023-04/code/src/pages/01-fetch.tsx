import { useEffect, useState } from "react";
import { getIssues, type IIssue } from "../api";
import Issue from "../components/Issue";

function Page() {
	const [data, setData] = useState<IIssue[]>();

	useEffect(() => {
		getIssues({}).then((data) => setData(data));
	}, []);

	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			{data.map((item) => (
				<Issue key={item.id} issue={item} />
			))}
		</div>
	);
}

export default Page;
