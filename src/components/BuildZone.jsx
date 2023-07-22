import React, { useState, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import uniqid from "uniqid";
import update from "immutability-helper";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Import field components
import {
	NameElement,
	PasswordElement,
	EmailElement,
	TextareaElement,
	AddressElement,
	PhoneElement,
	DateElement,
	TimeElement,
	WebsiteElement,
	FileElement,
	CheckboxElement,
	RadioElement,
	DropdownElement,
	RatingElement,
	SubmitElement,
	CurrencyElement,
	NumberElement,
	CancelElement,
	HeaderElement,
} from "./elements";
import axios from "axios";

function BuildZone() {
	// name <-> components
	const Map = {
		nameElement: NameElement,
		passwordElement: PasswordElement,
		emailElement: EmailElement,
		textareaElement: TextareaElement,
		addressElement: AddressElement,
		phoneElement: PhoneElement,
		dateElement: DateElement,
		timeElement: TimeElement,
		websiteElement: WebsiteElement,
		fileElement: FileElement,
		checkboxElement: CheckboxElement,
		radioElement: RadioElement,
		dropdownElement: DropdownElement,
		ratingElement: RatingElement,
		submitElement: SubmitElement,
		CurrencyElement: CurrencyElement,
		NumberElement: NumberElement,
		CancelElement: CancelElement,
		HeaderElement: HeaderElement,
	};

	const [models, setModels] = useState(undefined);
	const [selectedModel, setSelected] = useState('');

	useEffect(()=>{
		axios.get("https://builder.fiyge.com/development_base/models/index.json", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access")
			}
		}).then(res => {
			console.log(res.data);
			setModels(res.data.paginate.data.map(x => x["models.name"]));
		});
	}, []);

	// Track the list of fields in the build zone for rendering
	const [fields, setFields] = useState({
		model: "form",
		"forms.full_name": "Drag and drop form",
		components: [],
	});

	// Grab children initial configuration and add into field state
	const updateConfig = (config, index) => {
		const newField = update(fields, {
			components: {
				[index]: { $merge: config },
			},
		});
		console.log(newField);
		setFields(newField);
	};

	const handleDrop = (item, monitor) => {
		const temp = update(fields, {
			components: {
				$push: [{ name: monitor.getItem().name, id: uniqid("field-") }],
			},
		});
		setFields(temp);
	};

	// Drop field elements on build zone
	const [{ isOver }, dropRef] = useDrop({
		accept: "field",
		drop: (item, monitor) => handleDrop(item, monitor),
		collect: (monitor) => ({
			isOver: monitor.isOver({ shallow: true }),
		}),
	});

	// Pass down to BuildZone component for fields UI rendering
	const renderElements = (field, index, moveField, deleteField, updateConfig) => {
		// Dynamic component name
		const FieldElement = Map[field.name];

		return (
			<FieldElement
				onBuild={true}
				key={field.id}
				id={field.id}
				index={index}
				type="sortable"
				moveField={moveField}
				deleteField={deleteField}
				updateConfig={updateConfig}
			/>
		);
	};

	// Helper function for sortable fields
	const moveField = useCallback((dragIndex, hoverIndex) => {
		setFields((prevFields) =>
			update(prevFields, {
				components: {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, prevFields.components[dragIndex]],
					],
				},
			})
		);
	}, []);

	// Insert fields in between fields
	// const insertField = (hoverIndex, fieldName, insertPosition) => {
	// 	const newField = {
	// 		name: fieldName,
	// 		id: uniqid("field-"),
	// 	};
	// 	console.log({ newField });

	// 	setFields((prevFields) => {
	// 		if (hoverIndex === 0 && insertPosition === "insert-before") {
	// 			prevFields.unshift(newField);
	// 		} else if (insertPosition === "insert-before") {
	// 			prevFields.splice(hoverIndex - 1, 0, newField);
	// 		} else if (insertPosition === "insert-after") {
	// 			prevFields.splice(hoverIndex, 0, newField);
	// 		}
	// 		return [...prevFields];
	// 	});
	// };

	// Delete function
	const deleteField = (id) => {
		// const newFields = fields.filter((field) => {
		// 	return field.id !== id;
		// });
		const newFields = update(fields, {
			components: {
				$apply: (field) =>
					field.filter((item) => {
						return item.id !== id;
					}),
			},
		});
		setFields(newFields);
	};

	const backgroundColor = isOver ? "bg-warning" : "bg-light";
	const emptyField = fields.components.length === 0 ? true : false;

	// Modal
	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}
	function afterOpenModal() {
		subtitle.style.color = "#f00";
	}
	function closeModal() {
		setIsOpen(false);
	}

	const customStyles = {
		content: {
			bottom: "auto",
			width: "40vw",
			height: "75vh",
			margin: "auto",
			overflow: "scroll",
		},
	};

	return (
		<div
			ref={dropRef}
			className={`build-zone mx-auto border rounded ${backgroundColor} shadow-sm`}>
			{
				// Conditionally render the build zone
				emptyField ? (
					<div className="container " style={{ padding: "20px 50px" }}>
						<p className="text-muted lead text-center">Render Fields Here</p>
					</div>
				) : (
					<div>
						<Button
							variant="outlined"
							onMouseDown={openModal}
							style={{
								position: "absolute",
								top: "20px",
								right: "80px",
							}}>
							Export
						</Button>

						<Button
								variant="outlined" color="success"
								style={{
									position: "absolute",
									top: "20px",
									right: "330px",
									padding: "0.5%",
								}}>
								Create New Fiyge Form
						</Button>

						<Button 
						variant="outlined" color="secondary"
								style={{
									position: "absolute",
									top: "20px",
									right: "180px",
									padding: "0.5%"
								}}>
								Edit Fiyge Form
						</Button>

						<Modal
							isOpen={modalIsOpen}
							onAfterOpen={afterOpenModal}
							onRequestClose={closeModal}
							style={customStyles}
							contentLabel="Example Modal">
							<div class="modal-header">
								<h5 class="modal-title">Export JSON</h5>
								<button
									type="button"
									class="btn-close"
									aria-label="Close"
									onClick={closeModal}
								/>
							</div>
							<FormControl fullWidth sx={{mt:2}}>
								<InputLabel>Model</InputLabel>
								<Select
									value={selectedModel}	
									label="Model"
									onChange={(e)=>setSelected(e.target.value)}
									MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
									fullWidth
								>
									{models.map((item, i) => 
										<MenuItem value={item} key={i}>{item}</MenuItem>
									)}
								</Select>
							</FormControl>
							<Card variant="outlined" sx={{ mt: 3, pl: 4, pt: 2 }}>
								<pre>{JSON.stringify(fields, null, 2)}</pre>
							</Card>
						</Modal>
						{fields.components.map((field, index) =>
							renderElements(field, index, moveField, deleteField, updateConfig)
						)}
					</div>
				)
			}
		</div>
	); 
}

export default BuildZone;
