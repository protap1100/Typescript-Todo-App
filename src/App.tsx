import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Todo App</h1>
        <div className="mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Add a new todo"
          />
          <button
            onClick={addTodo}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Add Todo
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between mb-3 p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
