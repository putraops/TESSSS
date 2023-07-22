import { useRef, useState, useEffect, Fragment } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag, useDrop } from "react-dnd";
import DragDropWrapper from "./Wrappers/DragDropWrapper";
import DeleteIcon from "./Wrappers/DeleteIcon";

import ConfigWrapper from "./Wrappers/ConfigWrapper";

function NameElement(props) {
	// Deconstruct props
	const { onBuild, type, moveField, index, id, deleteField, insertField } = props;

	// --------------------------------------------------------------------
	// *** Drag implementation of fields in element titles ***

	const [{ titleDragging }, titleDrag] = useDrag({
		type: type,
		item: { name: "nameElement", type },
		collect: (monitor) => ({
			titleDragging: monitor.isDragging(),
		}),
	});

	const initialConfig = {
		first_label: "First Name",
		second_label: "Last Name",
		first_placeholder: "First Name",
		second_placeholder: "Last Name",
		elementType: "",
		class: "",
		primaryKey: "",
		moduleName: "",
	};

	const [config, setConfig] = useState(initialConfig);

	// React hooks
	const [focused, setFocused] = useState(false);
	const sortableRef = useRef(null);

	useEffect(() => {
		if (onBuild) {
			props.updateConfig(config, index);
		}
	}, [config]);

	// --------------------------------------------------------------------
	// *** Rendering ***

	// CSS properties
	let opacity;

	// Conditionally rendering the element
	if (onBuild !== true) {
		// Title rendering
		opacity = titleDragging ? 0.4 : 1;
		return (
			<div ref={titleDrag} style={{ opacity }} className="field-element">
				<FontAwesomeIcon icon="signature" fixedWidth />
				<span className="field-text">Name</span>
			</div>
		);
	} else {
		return (
			<Fragment>
				<DragDropWrapper
					sortableRef={sortableRef}
					index={index}
					moveField={moveField}
					insertField={insertField}
					id={id}
					setFocused={setFocused}
					fieldName="nameElement">
					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<div className="form-row">
							<div className="col">
								<label htmlFor="firstName">{config.first_label}</label>
								<input
									type="text"
									className="form-control"
									placeholder={config.first_placeholder}
								/>
							</div>
							<div className="col">
								<label htmlFor="lastName">{config.second_label}</label>
								<input
									type="text"
									className="form-control"
									placeholder={config.second_placeholder}
								/>
							</div>
						</div>
					</div>
				</DragDropWrapper>

				<DeleteIcon focused={focused} deleteField={() => deleteField(id)}></DeleteIcon>
				<ConfigWrapper focused={focused}>
					{/* **************** */}

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>First Label </label> <label style={{ color: "red" }}>*</label>
						<input
							className="form-control"
							required
							id=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									first_label: e.target.value,
								}))
							}
							placeholder={config.first_label}
						/>
						<label>Second Label </label> <label style={{ color: "red" }}>*</label>
						<input
							className="form-control"
							required
							id=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									second_label: e.target.value,
								}))
							}
							placeholder={config.second_label}
						/>
					</div>

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>First Placeholder</label>
						<input
							className="form-control"
							required
							id=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									first_placeholder: e.target.value,
								}))
							}
							placeholder={config.first_placeholder}
						/>

						<label>Second Placeholder</label>
						<input
							className="form-control"
							required
							id=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									second_placeholder: e.target.value,
								}))
							}
							placeholder={config.second_placeholder}
						/>
					</div>

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>Element Type</label>
						<input
							className="form-control"
							id=""
							placeholder=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									elementType: e.target.value,
								}))
							}
						/>
					</div>

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>Class</label>
						<input
							className="form-control"
							id=""
							placeholder=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									class: e.target.value,
								}))
							}
						/>
					</div>

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>Primary Key</label>
						<input
							className="form-control"
							id=""
							placeholder=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									primaryKey: e.target.value,
								}))
							}
						/>
					</div>

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>Module Name</label>
						<input
							className="form-control"
							id=""
							placeholder=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									publicKey: e.target.value,
								}))
							}
						/>
					</div>

					{/* Write Modal here */}
				</ConfigWrapper>
			</Fragment>
		);
	}
}

export default NameElement;
