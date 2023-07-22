import { useRef, useState, useEffect, Fragment } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag, useDrop } from "react-dnd";
import DragDropWrapper from "./Wrappers/DragDropWrapper";
import DeleteIcon from "./Wrappers/DeleteIcon";
import ConfigWrapper from "./Wrappers/ConfigWrapper";

function CheckboxElement(props) {
	// Deconstruct props
	const { onBuild, type, moveField, index, id, deleteField, insertField } = props;

	// --------------------------------------------------------------------
	// *** Drag implementation of fields in element titles ***

	const [{ titleDragging }, titleDrag] = useDrag({
		type: type,
		item: { name: "checkboxElement", type },
		collect: (monitor) => ({
			titleDragging: monitor.isDragging(),
		}),
	});

	// React hooks
	const [focused, setFocused] = useState(false);
	const sortableRef = useRef(null);

	// --------------------------------------------------------------------
	// *** Rendering ***

	// CSS properties
	let opacity;

	// Conditionally rendering the element
	if (onBuild !== true) {
		opacity = titleDragging ? 0.4 : 1;
		return (
			<div ref={titleDrag} style={{ opacity }} className="field-element" id={{ id }}>
				<FontAwesomeIcon icon="check-square" fixedWidth />
				<span className="field-text">Checkboxes</span>
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
					fieldName="checkboxElement">
					{/* Edit UI field here */}
					<div className={`form-group ${focused ? "border-left" : ""}`}>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="defaultCheck1"
							/>
							<label className="form-check-label" htmlFor="defaultCheck1">
								<input placeholder="Checkbox" className="form-control-sm" />
							</label>
						</div>
					</div>
				</DragDropWrapper>

				<DeleteIcon focused={focused} deleteField={() => deleteField(id)}></DeleteIcon>
				<ConfigWrapper focused={focused}>
					{/* **************** */}
					{/* Write Modal here */}
				</ConfigWrapper>
			</Fragment>
		);
	}
}

export default CheckboxElement;
