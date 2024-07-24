import React, { useEffect, useState } from "react";

// Definimos el componente principal
const Home = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const apiURL = "https://playground.4geeks.com/todo/users/AngelCS94"; // URL base de la API

    // Función para obtener los todos
    const getTodos = () => {
        fetch(apiURL)
            .then((response) => {
                if (!response.ok) throw new Error('Error al obtener los todos');
                return response.json();
            })
            .then((data) => {
                console.log(data)
                if (Array.isArray(data.todos)) {
                    setTodos(data.todos);
                } else {
                    setTodos([]);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los todos:", error);
                setTodos([]);
            });
    };

    // useEffect para obtener los todos cuando el componente se monte
    useEffect(() => {
        getTodos();
    }, []);

    // Función para agregar un nuevo todo
    const addTodo = () => {
        const newTodos = [...todos, { label: todo, done: false }];
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodos),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Error al agregar el todo');
                return response.json();
            })
            .then(() => {
                getTodos();
                setTodo("");
            })
            .catch((error) => {
                console.error("Error al agregar el todo:", error);
            });
    };

    // Función para eliminar un todo
    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodos),
        })
            .then((response) => {response.json();
            })
            .then(() => {
                getTodos();
            })
            .catch((error) => {
                console.error("Error al eliminar el todo:", error);
            });
    };

    // Manejar la adición de todo al presionar Enter
    const handleAddTodo = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Para evitar que se recargue la página
            if (todo.trim() !== "") {
                addTodo();
            }
        }
    };

    return (
        <div className="container mt-5 text-center border shadow-lg p-3 mb-5 bg-body rounded rounded-3">
            <h1 className="text-center mt-5">To Do List!</h1>
            <form>
                <div className="mb-3 container col-lg-9">
                    <label htmlFor="todoInput" className="form-label"></label>
                    <input
                        type="text"
                        className="form-control"
                        id="todoInput"
                        placeholder="What's needs to be done?"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        onKeyDown={handleAddTodo}
                    />
                </div>
            </form>
            
            <ul className="container list-group list-group-flush mt-3 col-lg-8">
                {Array.isArray(todos) && todos.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center mt-2">
                        {item.label}
                        <button className="btn btn-danger" onClick={() => deleteTodo(index)}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <p className="mt-3">Total todo's: {todos.length}</p>
        </div>
    );
};

export default Home;
