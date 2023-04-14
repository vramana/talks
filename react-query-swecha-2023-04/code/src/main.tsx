import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Page01 from "./pages/01-fetch";
import * as Page02 from "./pages/02-fetch-complete";
import * as Page03 from "./pages/03-simple-query";
import * as Page04 from "./pages/04-pagination";
import * as Page05 from "./pages/05-depdendent-queries";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/page-01",
		element: <Page01 />,
	},
	{
		path: "/page-02",
		element: <Page02.IssuesPage />,
	},
	{
		path: "/page-03",
		element: <Page03.IssuesPage />,
	},
	{
		path: "/page-04",
		element: <Page04.IssuesPage />,
	},
	{
		path: "/page-05",
		element: <Page05.Root />,
		children: [
			{
				path: "",
				element: <Page05.IssuesPage />,
			},
			{
				path: "issues/:number",
				element: <Page05.IssuePage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
