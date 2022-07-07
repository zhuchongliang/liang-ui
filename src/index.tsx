import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/css/reset.css";
import "./index.scss";
import Home from "./views/home";

function App(): JSX.Element {
	return (
		<div className="main-page pr">
			<BrowserRouter>
				<Routes>
					<Route path="" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

const container = document.getElementById("root");
container && createRoot(container).render(<App />);