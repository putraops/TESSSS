import { useRef, useState, useEffect, Fragment } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag, useDrop } from "react-dnd";
import ReactStars from "react-rating-stars-component";
import DragDropWrapper from "./Wrappers/DragDropWrapper";
import DeleteIcon from "./Wrappers/DeleteIcon";
import ConfigWrapper from "./Wrappers/ConfigWrapper";

function RatingElement(props) {
	// Deconstruct props
	const { onBuild, type, moveField, index, id, deleteField, insertField } = props;

	// --------------------------------------------------------------------
	// *** Drag implementation of fields in element titles ***

	const [{ titleDragging }, titleDrag] = useDrag({
		type: type,
		item: { name: "ratingElement", type },
		collect: (monitor) => ({
			titleDragging: monitor.isDragging(),
		}),
	});

	const initialConfig = {
		label: "Your Rating",
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

	const ratingChanged = (newRating) => {
		console.log(newRating);
	};

	// CSS properties
	let opacity;

	// Conditionally rendering the element
	if (onBuild !== true) {
		// Title rendering
		opacity = titleDragging ? 0.4 : 1;
		return (
			<div ref={titleDrag} style={{ opacity }} className="field-element">
				<FontAwesomeIcon icon="star" fixedWidth />
				<span className="field-text">Rating</span>
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
					fieldName="ratingElement">
					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<label htmlFor="rating">{config.label}</label>
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={24}
							isHalf={true}
							activeColor="#ffd700"
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

export default RatingElement;
