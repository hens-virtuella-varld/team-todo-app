import React, { useState } from "react";
import classes from "./EditNDelete.module.css";

function Read(props) {
	const { data } = props;

	const [editedItem, setEditedItem] = useState(null);

	const deleteItem = async (id) => {
		try {
			const response = await fetch(`http://localhost:3001/api/my_table/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				console.log(`Id ${id} deleted`);
				props.deleteItem(id);
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const editData = (id) => {
		if (editedItem === id) {
			setEditedItem(null);
		} else {
			setEditedItem(id);
		}
	};

	return (
		<div className={classes.list}>
			<ul>
				{data.map((x) => (
					<li key={x.id}>
						<div className={classes.todoTitle}>
							{editedItem === x.id ? (
								<input
									type="text"
									defaultValue={x.todo}
									onBlur={(e) => props.saveTheChange(x.id, e.target.value)}
								/>
							) : (
								x.todo
							)}
						</div>
						<div className={classes.btnGroup}>
							<button
								className={classes.editBtn}
								onClick={() => {
									editData(x.id);
								}}
							>
								{editedItem === x.id ? "Save" : "Edit"}
							</button>
							<button
								className={classes.deleteBtn}
								onClick={() => deleteItem(x.id)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Read;
