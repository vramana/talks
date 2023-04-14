import { Link } from "react-router-dom";

import "./App.css";

function App() {
	return (
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
	);
}

export default App;
