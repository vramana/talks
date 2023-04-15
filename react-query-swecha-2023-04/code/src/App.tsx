import { useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";

function App() {
	const [value, setValue] = useState(
		localStorage.getItem("github_token") || "",
	);
	const [token, setToken] = useState(value);
	const [showHelp, setShowHelp] = useState(false);

	return (
		<div>
			{token != null || token !== "" ? (
				<>
					<div className="flex border border-solid border-gray-500 mb-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
						<input
							className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
							type="text"
							placeholder="Enter your Github token"
							value={value}
							onFocus={() => setShowHelp(false)}
							onChange={(e) => setValue(e.target.value)}
						/>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => {
								localStorage.setItem("github_token", value);
							}}
						>
							Save
						</button>
						<button onClick={() => setShowHelp(true)}>
							Why do I need to token?
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have an authorized token</p>
					<button
						onClick={() => {
							localStorage.removeItem("github_token");
							setToken("");
						}}
					>
						Clear Token
					</button>
				</>
			)}
			{showHelp ? (
				<p>
					Unauthorized requests to Github API calls are limited to 60 per hour.
					To increase this limit, you need to authenticate your requests. Please create 
          a fine grained Github personal access token that has access and paste it in the input above.
				</p>
			) : undefined}

			<div className="App">
				<h2>React Query Examples</h2>
				<div>
					<Link to="/page-01">Simple fetch</Link>
				</div>
				<div>
					<Link to="/page-02">Complete fetch</Link>
				</div>
				<div>
					<Link to="/page-03">Simple query</Link>
				</div>
				<div>
					<Link to="/page-04">Paginated query</Link>
				</div>
				<div>
					<Link to="/page-05">Dependent queries</Link>
				</div>
				<div>
					<Link to="/page-06">Query mutation & invalidation</Link>
				</div>
			</div>
		</div>
	);
}

export default App;
