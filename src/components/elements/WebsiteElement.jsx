import { useRef, useState, useEffect, Fragment } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag, useDrop } from "react-dnd";
import DragDropWrapper from "./Wrappers/DragDropWrapper";
import DeleteIcon from "./Wrappers/DeleteIcon";
import ConfigWrapper from "./Wrappers/ConfigWrapper";

function WebsiteElement(props) {
	// Deconstruct props
	const { onBuild, type, moveField, index, id, deleteField, insertField } = props;

	// --------------------------------------------------------------------
	// *** Drag implementation of fields in element titles ***

	const [{ titleDragging }, titleDrag] = useDrag({
		type: type,
		item: { name: "websiteElement", type },
		collect: (monitor) => ({
			titleDragging: monitor.isDragging(),
		}),
	});

	const initialConfig = {
		label: "Website Link/URL",
		placeholder: "https://example.com",
		elementType: "",
		class: "",
		primaryKey: "",
		moduleName: "",
	};

	const [config, setConfig] = useState(initialConfig);

	useEffect(() => {
		if (onBuild) {
			props.updateConfig(config, index);
		}
	}, [config]);

	// React hooks
	const [focused, setFocused] = useState(false);
	const sortableRef = useRef(null);

	// --------------------------------------------------------------------
	// *** Rendering ***
	let opacity;

	// Conditionally rendering the element
	if (onBuild !== true) {
		// Title rendering
		opacity = titleDragging ? 0.4 : 1;
		return (
			<div ref={titleDrag} style={{ opacity }} className="field-element">
				<FontAwesomeIcon icon="link" fixedWidth />
				<span className="field-text">Web/URL</span>
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
					setFocused={setFocused}
					id={id}
					fieldName="websiteElement">
					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label htmlFor="url">{config.label}</label> <br></br>
						<input
							type="url"
							name="url"
							id="url"
							placeholder={config.placeholder}
							pattern="https://.*"
							size="30"
							className="form-control-sm"
						/>
					</div>
				</DragDropWrapper>

				<DeleteIcon focused={focused} deleteField={() => deleteField(id)}></DeleteIcon>
				<ConfigWrapper focused={focused}>
					{/* **************** */}

					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>Label </label> <label style={{ color: "red" }}>*</label>
						<input
							className="form-control"
							required
							id=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									label: e.target.value,
								}))
							}
							placeholder={config.label}
						/>
					</div>
					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label>Placeholder</label>
						<input
							className="form-control"
							required
							id=""
							onChange={(e) =>
								setConfig((prevConfig) => ({
									...prevConfig,
									placeholder: e.target.value,
								}))
							}
							placeholder={config.placeholder}
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

export default WebsiteElement;