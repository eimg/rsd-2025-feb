import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";

import AppProvider from "./AppProvider.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppProvider>
			<BrowserRouter>
				<Routes>
                    <Route path="/" element={<App />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
			</BrowserRouter>
		</AppProvider>
	</React.StrictMode>
);
