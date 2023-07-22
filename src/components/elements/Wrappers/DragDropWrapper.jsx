import { useEffect } from "react";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

function DragDropWrapper(props) {
	const { sortableRef, index, moveField, id, fieldName, setFocused } = props;

	const [{ handlerID }, drop] = useDrop({
		accept: ["sortable", "field"],
		collect(monitor) {
			return {
				handlerID: monitor.getHandlerId(),
			};
		},
		drop(item, monitor) {
			// if (item.type === "field") {
			// 	const hoverIndex = index;
			// 	// Determine rectangle on screen
			// 	const hoverBoundingRect = sortableRef.current?.getBoundingClientRect();
			// 	const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// 	const clientOffset = monitor.getClientOffset();
			// 	const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// 	let insertPosition;
			// 	if (hoverClientY < hoverMiddleY) {
			// 		insertPosition = "insert-before";
			// 	} else {
			// 		insertPosition = "insert-after";
			// 	}
			// 	console.log({ hoverIndex, insertPosition });
			// 	insertField(hoverIndex, fieldName, insertPosition);
			// }
		},
		hover(item, monitor) {
			if (item.type === "field") {
				return;
			} else {
				if (!sortableRef.current) {
					return;
				}
				const dragIndex = item.index;
				const hoverIndex = index;

				// Don't replace items with themselves
				if (dragIndex === hoverIndex) {
					return;
				}

				// Determine rectangle on screen
				const hoverBoundingRect = sortableRef.current?.getBoundingClientRect();
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
				const clientOffset = monitor.getClientOffset();
				const hoverClientY = clientOffset.y - hoverBoundingRect.top;

				// Dragging downwards
				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return;
				}
				// Dragging upwards
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return;
				}

				// Time to move the field
				moveField(dragIndex, hoverIndex);
				item.index = hoverIndex;
			}
		},
	});

	// useDrag hook
	const [{ isDragging }, drag] = useDrag({
		type: "sortable",
		item: { name: { fieldName }, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(sortableRef));

	// Hide and display control widget
	useEffect(() => {
		function handleClickOutside(event) {
			if (sortableRef.current && !sortableRef.current.contains(event.target)) {
				setFocused(false);
			} else if (sortableRef.current && sortableRef.current.contains(event.target)) {
				setFocused(true);
			}
		}

		// Bind the event listener
		document.addEventListener("click", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("click", handleClickOutside);
		};
	}, [sortableRef, setFocused]);

	const opacity = isDragging ? 0 : 1;
	return (
		<div ref={sortableRef} style={{ opacity }} data-handler-id={handlerID} id={id}>
			{props.children}
		</div>
	);
}

export default DragDropWrapper;
