import React from "react";

function DeleteIcon(props) {
	const { focused, deleteField } = props;
	return (
		<div className={focused ? "show-action-group" : "hide-action-group"}>
			<button
				className="btn btn-danger btn-sm rounded delete"
				type="button"
				data-toggle="tooltip"
				data-placement="top"
				title="delete icon"
				onMouseDown={() => deleteField()}
				data-original-title="Delete">
				<i className="fa fa-trash"></i>
			</button>
		</div>
	);
}

export default DeleteIcon;
