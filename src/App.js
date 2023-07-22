import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";

import Builder from "./components/Builder";
import AppHeader from "./components/AppHeader";
import SignIn from "./components/SignIn";

// Font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faFont,
	faUnlock,
	faEnvelope,
	faPhone,
	faCalendarAlt,
	faClock,
	faLink,
	faFileUpload,
	faCheckSquare,
	faCircle,
	faCaretSquareDown,
	faStar,
	faHandPointer,
	faCheck,
	faAddressCard,
	faSignature,
	faMoneyBill,
	faHashtag,
	faBan,
	faHeading,
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faFont,
	faUnlock,
	faEnvelope,
	faPhone,
	faCalendarAlt,
	faClock,
	faLink,
	faFileUpload,
	faCheckSquare,
	faCircle,
	faCaretSquareDown,
	faStar,
	faHandPointer,
	faCheck,
	faAddressCard,
	faSignature,
	faMoneyBill,
	faHashtag,
	faBan,
	faHeading,
);

function App() {
	return (
		<div className="App">
			<AppHeader></AppHeader>
			<Router>
				<Routes>
					{/* Testing */}
					<Route path="/" element={<SignIn />} /> /
					<Route path="/builder" element={<Builder />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
