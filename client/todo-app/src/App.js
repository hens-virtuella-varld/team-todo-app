import { useEffect, useState } from "react";
import "./App.css";
import Create from "./components/Create";
import EditNDelete from "./components/EditNDelete";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("https://team-todo-app.onrender.com/api/my_table/")
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((error) => console.error(error));
	}, []);

	const getData = (item) => {
		setData([...data, item]);
	};

	const deleteItem = (id) => {
		setData(data.filter((item) => item.id !== id));
	};

	const saveTheChange = async (id, newTodo) => {
		try {
			const response = await fetch(
				`https://team-todo-app.onrender.com/api/my_table/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ todo: newTodo }),
				}
			);

			if (response.ok) {
				const updatedItem = await response.json();
				setData(
					data.map((item) =>
						item.id === id ? { ...item, todo: newTodo } : item
					)
				);
			} else {
				throw new Error("Something went wrong");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="App">
			<h1>Todo App</h1>
			<Create getData={getData} />
			<EditNDelete
				data={data}
				deleteItem={deleteItem}
				saveTheChange={saveTheChange}
			/>
		</div>
	);
}

export default App;
