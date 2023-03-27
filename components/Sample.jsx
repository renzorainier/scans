import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleCompleted = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (index, text) => {
    setTodos(
      todos.map((todo, i) => (i === index ? { ...todo, text } : todo))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-80">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <input
            className="w-full border rounded-lg py-2 px-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-2 w-full"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
        <ul className="mt-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-white rounded-lg p-4 shadow-md flex justify-between items-center mb-2"
            >
              {todo.editing ? (
                <input
                  className="border rounded-lg py-1 px-2"
                  value={todo.text}
                  onChange={(e) =>
                    handleEditTodo(index, e.target.value)
                  }
                />
              ) : (
                <span
                  className={`${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                  onClick={() => handleToggleCompleted(index)}
                >
                  {todo.text}
                </span>
              )}
              <div>
                <button
                  className="bg-yellow-500 text-white rounded-lg py-1 px-2 mr-2"
                  onClick={() =>
                    handleEditTodo(index, {
                      ...todo,
                      editing: !todo.editing,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white rounded-lg py-1 px-2"
                  onClick={() => handleDeleteTodo(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;