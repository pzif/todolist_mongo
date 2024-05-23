import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('https://todo-backend.rodrigoolivei73.repl.co/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
        const response = await axios.post('https://todo-backend.rodrigoolivei73.repl.co/todos', {
            title: newTodo,
            completed: false
        });
        setTodos([...todos, response.data]);
        setNewTodo('');
    };

    const toggleTodo = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        const response = await axios.put(`https://todo-backend.rodrigoolivei73.repl.co/todos/${id}`, {
            ...todo,
            completed: !todo.completed
        });
        setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`https://todo-backend.rodrigoolivei73.repl.co/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div>
            <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTodo(todo._id)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
