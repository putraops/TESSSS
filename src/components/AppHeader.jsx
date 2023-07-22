import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import dndLogo from "../images/DnD-logo.png";

function Login(props) {
	const handleSubmit = () => {
		localStorage.setItem("access", "null");
	};
	if (!props.loggedIn) {
		return (
			<Button href="/" color="info">
				Login
			</Button>
		);
	} else {
		return (
			<Button onClick={handleSubmit} href="/" color="info">
				Logout
			</Button>
		);
	}
}

function AppHeader() {
	const [loggedIn, setLoggedIn] = useState(true);
	useEffect(() => {
		if (localStorage.getItem("access") === "null") {
			setLoggedIn(false);
		} else {
			axios({
				method: "get",
				url: "https://builder.fiyge.com/access_controls/users/index.json",
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Bearer " + localStorage.getItem("access"),
				},
			}).then((res) => {
				// Checking if user is logged in and redirecting them if they're not
				if (
					res.data.message.includes("Login failed") ||
					res.data.errors.includes("Client need to login to access this URL")
				) {
					localStorage.setItem("access", "null");
					setLoggedIn(false);
				} else {
					setLoggedIn(true);
				}
			});
		}
	});

	return (
		<div className="navbar navbar-dark bg-dark shadow p-4">
			<a href="/" className="navbar-brand text-warning" style={{ padding: "0px" }}>
				<img
					src={dndLogo}
					alt="logo"
					style={{
						width: "200px",
					}}
				/>
			</a>
		</div>
	);
}

export default AppHeader;
