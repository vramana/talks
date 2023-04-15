import { Link } from "react-router-dom";
import { type IIssue } from "../api";

export default function Issue({
	issue,
	enableLink,
}: {
	issue: IIssue;
	enableLink?: true;
}) {
	const content = (
		<div
			className="p-2 border-solid border-0 border-b border-gray-300"
			key={issue.id}
		>
			<div className="text-lg ">
				<b>
					{issue.pull_request ? "!" : "#"}
					{issue.number}
				</b>
				: {issue.title}
			</div>
			<div className="text-sm " key={issue.id}>
				Authored by <b>{issue.user.login}</b> {issue.comments} comment
				{issue.comments === 1 ? "" : "s"}
			</div>
		</div>
	);

	return enableLink ? (
		<Link
			to={`issues/${issue.number}`}
			className="text-zinc-900 hover:text-gray-400"
		>
			{content}
		</Link>
	) : (
		content
	);
}
