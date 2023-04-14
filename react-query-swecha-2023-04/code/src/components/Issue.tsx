import { type IIssue } from "../api";

export default function Issue({ issue }: { issue: IIssue }) {
	return (
		<div className="p-2 even:bg-zinc-900" key={issue.id}>
			<div className="text-lg ">
				<b>{issue.number}</b>: {issue.title}
			</div>
			<div className="text-sm " key={issue.id}>
				Authored by <b>{issue.user.login}</b>
			</div>
		</div>
	);
}
