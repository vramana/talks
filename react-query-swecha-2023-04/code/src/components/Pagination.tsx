export default function Pagination({
	page,
	setPage,
}: {
	page: number;
	setPage: (page: number) => void;
}) {
	return (
		<div className="flex justify-center">
			<button
				className="bg-gray-700 text-white font-bold py-2 px-4 m-2 rounded"
				onClick={() => setPage(page - 1)}
				disabled={page === 1}
			>
				Previous
			</button>
			<button
				className="bg-gray-700 text-white font-bold py-2 px-4 m-2 rounded"
				onClick={() => setPage(page + 1)}
			>
				Next
			</button>
		</div>
	);
}
