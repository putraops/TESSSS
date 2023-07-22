import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag } from "react-dnd";
import DragDropWrapper from "./Wrappers/DragDropWrapper";
import DeleteIcon from "./Wrappers/DeleteIcon";
import ConfigWrapper from "./Wrappers/ConfigWrapper";

function DropdownElement(props) {
	// Deconstruct props
	const { onBuild, type, moveField, index, id, deleteField, insertField } = props;

	return (
		<div className="field-element">
			<FontAwesomeIcon icon="caret-square-down" fixedWidth />
			<span className="field-text">Dropdown</span>
		</div>
	);
}

export default DropdownElement;
