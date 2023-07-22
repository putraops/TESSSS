import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GoogleLoginButton } from "react-social-login-buttons";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import logo from "../images/fiyge-logo.png";

import "../App.css";

function Signin() {
	const navigate = useNavigate();
	const [failed, setFailed] = useState(false);
	const [created, setCreated] = useState(false);

	if (localStorage.getItem("flash") !== "false" && localStorage.getItem("flash") !== "null") {
		setCreated(true);
		localStorage.setItem("flash", false);
	}

	const handleClose1 = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setFailed(false);
	};

	const handleClose2 = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setCreated(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		let formData = new FormData();
		formData.append("data[users][user_name]", data.get("email"));
		formData.append("data[users][user_password]", data.get("password"));
		axios
			.post("https://builder.fiyge.com/access_controls/users/login.json", formData)
			.then((response) => {
				console.log({ response });
				if (
					response.data.errors.length === 0 &&
					response.data.message.includes("login successfully")
				) {
					localStorage.setItem("access", response.data.access_token);
					localStorage.setItem("refresh", response.data.refresh_token);
					localStorage.setItem("flash", "Logged in");
					navigate("/builder");
				} else {
					setFailed(true);
				}
			});
	};

	return (
		<div>
			<Snackbar open={failed} autoHideDuration={6000} onClose={handleClose1}>
				<Alert onClose={handleClose1} severity="error" sx={{ width: "100%" }}>
					Login failed
				</Alert>
			</Snackbar>
			<Snackbar open={created} autoHideDuration={6000} onClose={handleClose2}>
				<Alert onClose={handleClose2} severity="success" sx={{ width: "100%" }}>
					Account created!
				</Alert>
			</Snackbar>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					{/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar> */}
					<img
						src={logo}
						alt="logo"
						style={{
							width: "300px",
							marginBottom: "20px",
						}}
					/>
					<Typography align="center" component="h1" variant="body1">
						Please enter your email address and password.
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>

						<div className="hr-text"></div>
						{/* <Stack sx={{ pt: 1 }} direction="row" spacing={2} justifyContent="center">
							<Grid container>
								<Grid item>
									<Link href="https://builder.fiyge.com/access_controls/users/social_login?provider=Facebook">
										<FacebookLoginButton>
											<span style={{ fontSize: 13 }}>
												Log in with Facebook
											</span>
										</FacebookLoginButton>
									</Link>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item>
									<Link href="https://builder.fiyge.com/access_controls/users/social_login?provider=Google">
										<GoogleLoginButton>
											<span style={{ fontSize: 13 }}>Log in with Google</span>
										</GoogleLoginButton>
									</Link>
								</Grid>
							</Grid>
						</Stack> */}

						<Link href="https://builder.fiyge.com/access_controls/users/social_login?provider=Google">
							<GoogleLoginButton>
								<div style={{ textAlign: "center" }}>
									<span style={{ fontSize: 13 }}>Log in with Google</span>
								</div>
							</GoogleLoginButton>
						</Link>
					</Box>
				</Box>
			</Container>
		</div>
	);
}

export default Signin;
