import React, { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { FixedSizeList } from "react-window";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import ListItemIcon from "@mui/material/ListItemIcon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AutoSizer from "react-virtualized-auto-sizer";
import Modal from "react-modal";
import Card from "@mui/material/Card";
import uniqid from "uniqid";

function ListForms() {
	// Fiyge form data
	const [formList, setFormList] = useState();
	const [error, setError] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Fetch all the list from Fiyge using API call
	const query = encodeURI(
		JSON.stringify({
			fields: ["forms.full_name"],
			limit: 1000,
		})
	);

	useEffect(() => {
		console.log("API Called");
		setMounted(true);
		axios({
			method: "get",
			url: `https://builder.fiyge.com/development_base/forms/index.json?q=${query}`,
			headers: {
				// "Content-Type": "multipart/form-data",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		})
			.then((res) => {
				// console.log(res.data.paginate.data);
				setFormList(res.data.paginate.data);
			})
			.catch((error) => {
				console.log({ error });
				setError(true);
			});
	}, []);

	// Search bar
	const [inputText, setInputText] = useState("");

	let inputHandler = (e) => {
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

	// Modal
	let subtitle;
	const [modalIsOpen, setIsOpen] = useState(false);
	const [formID, setFormID] = useState();

	function openModal(id) {
		setIsOpen(true);
		setFormID(id);
	}
	function afterOpenModal() {
		// subtitle.style.color = "#f00";
	}
	function closeModal() {
		setIsOpen(false);
	}

	const customStyles = {
		content: {
			bottom: "auto",
			width: "900px",
			height: "85vh",
			margin: "auto",
			overflow: "scroll",
		},
	};

	// Get all nodes of the double clicked form
	const [formResult, setFormResult] = useState();
	const isInitialMount = useRef(true);

	useEffect(() => {
		console.log("get form nodes called");
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			axios({
				method: "get",
				url: `https://builder.fiyge.com/development_base/forms/index.json?q={"fields":["forms.*"],"with_recursive":{"forms.id": ${formID}}}`,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Bearer " + localStorage.getItem("access"),
				},
			})
				.then((res) => {
					console.log(res);
					setFormResult(res.data);
				})
				.catch((error) => {
					console.log({ error });
					setError(true);
				});
		}
	}, [modalIsOpen, formID]);

	// Get all nodes in form
	function getFormResult(id, formName) {
		console.log("get form nodes called");

		return (
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal">
				<div className="modal-header">
					<h5 className="modal-title">Export JSON</h5>
					<button
						type="button"
						className="btn-close"
						aria-label="Close"
						onClick={closeModal}></button>
				</div>
				<Card variant="outlined" sx={{ mt: 3, pl: 4, pt: 2 }}>
					{formResult ? (
						<div>
							{`Form: ${formName}`}
							<br></br>
							{`ID: ${id}`}

							<pre>{JSON.stringify(formResult, null, 2)}</pre>
						</div>
					) : null}
				</Card>
			</Modal>
		);
	}

	// Render each form name and id in list
	const renderFormNames = (id, formName) => {
		return (
			<ListItem dense key={id} component="div" disablePadding sx={{ pr: 2 }}>
				<ListItemButton onDoubleClick={() => openModal(id)}>
					{window.innerWidth >= 1680 ? (
						<ListItemIcon>
							<FormatAlignLeftIcon />
						</ListItemIcon>
					) : null}
					<ListItemText primary={formName} secondary={`ID: ${id}`} />
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</ListItemButton>
				{modalIsOpen && formID === id ? getFormResult(id, formName) : null}
			</ListItem>
		);
	};

	// Render the list only after fetching the forms successfully
	if (error) {
		return <div>An error has occur...</div>;
	} else if (!formList) {
		return (
			<div style={{ textAlign: "center" }}>
				<CircularProgress />
				<Typography>Loading...</Typography>
			</div>
		);
	} else {
		let height = window.innerHeight - 210;

		// Search bar filtering
		const filteredData = formList.filter((el) => {
			if (inputText === "") {
				return el;
			} else {
				return el["forms.full_name"].toLowerCase().includes(inputText);
			}
		});
		return (
			<div style={{ height }}>
				<TextField
					id="outlined-basic"
					onChange={inputHandler}
					variant="outlined"
					fullWidth
					label="Search"
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>

				{/* Use FixedSizeList for better performance */}
				<AutoSizer>
					{({ height, width }) => (
						<FixedSizeList
							style={{ marginTop: "10px" }}
							height={height}
							width={width}
							itemSize={60}
							itemData={filteredData}
							itemCount={Object.keys(filteredData).length}>
							{({ data, index, style }) => {
								return (
									<div style={style}>
										{renderFormNames(
											data[index]["forms.id"],
											data[index]["forms.full_name"]
										)}
									</div>
								);
							}}
						</FixedSizeList>
					)}
				</AutoSizer>
			</div>
		);
	}
}

export default ListForms;
