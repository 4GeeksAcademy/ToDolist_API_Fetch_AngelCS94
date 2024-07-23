import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const getTodosURL = "https://playground.4geeks.com/todo/users/AngelCS94"

	//useEffect(()=>{
	//	fetch(getTodosURL)
	//	.then(response => response.json())
	//	.then(data =>{
	//		setTodos(data.todos)
	//	})
	//	.catch(error=>{error})
	// },[])

		// Antes del POST, hay que meter el useEffect(Fetch -->GET)
		//Aqui puede ir nuestro Fetch --> POST + Body
	const SumaDeTodo = (e) => {
		// pulsamos enter // verificamos boton, añadimos contenido y dejamos variable vacia//
		if (e.key === "Enter") {
			e.preventDefault(); //Para evitar que se recargue la pagina
			if (todo.trim() !== "") 
				{ 
				setTodos([...todos, todo]);
				setTodo("");
			}
		}
	};
		//Aqui puede ir nuestro fetch --> DELETE
	const EliminaTodo = (index) => {
		const nuevoTodo = todos.filter((_, todoIndex) => todoIndex !== index);
		setTodos(nuevoTodo);
	};

	return (
		<div className= "container mt-5 text-center border shadow-lg p-3 mb-5 bg-body rounded rounded-3">
			<h1 className="text-center mt-5">To Do List!</h1>
			<form >
				<div className="mb-3 container col-lg-9">
					<label htmlFor="todoInput" className="form-label"></label>
					<input
						type="text"
						className="form-control"
						id="todoInput"
						placeholder="What's needs to be done?"
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
						onKeyDown={SumaDeTodo}
					/>
				</div>
			</form>
			
			<ul className="container list-group list-group-flush mt-3 col-lg-8">
				{todos.map((item, index) => (
					
					<li key={index} className="list-group-item d-flex justify-content-between align-items-center mt-2 ">
						{item}
						<button className="btn btn-danger" onClick={() => EliminaTodo(index)}>
						X
						</button>
					</li>
				))}
			</ul>
			<p className="mt-3 ">Total todo's: {todos.length}</p>
		</div>
	);
};

export default Home;