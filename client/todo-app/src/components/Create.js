import React, { useState } from "react";
import classes from "./Create.module.css";

const Update = (props) => {
	// Destructure

	/* const { getData } = props; */

	const getData = props.getData;

	const [todo, setTodo] = useState("");

	// Update todo state
	const handleChange = (e) => {
		setTodo(e.target.value);
	};

	// Submit form
	const postData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`https://team-todo-app.onrender.com/api/my_table`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// Request body
				body: JSON.stringify({ todo }),
			});

			if (response.ok) {
				const item = await response.json();
				console.log("Item created:", item);
				// Reset todo state
				setTodo("");
				// Call getData
				getData(item);
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form className={classes.form} onSubmit={postData}>
			<label htmlFor="todo">What needs to be done?</label>
			<input
				type="text"
				id="todo"
				name="todo"
				value={todo}
				onChange={handleChange}
			/>
			<button type="submit">Add</button>
		</form>
	);
};

export default Update;
