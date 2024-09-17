import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Track which item is being edited
  const [editInput, setEditInput] = useState(""); // To store the input while editing

  // Add new task to the todo list
  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  // Toggle completion status
  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // Delete a task
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Start editing a task
  const startEditing = (index) => {
    setIsEditing(index);
    setEditInput(todos[index].text); // Set the current task's text as the default value in the edit input field
  };

  // Save the edited task
  const saveEdit = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, text: editInput }; // Update the text with the new input
      }
      return todo;
    });
    setTodos(newTodos);
    setIsEditing(null); // Close the editing mode
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">Todo List</h1>

        {/* Form to add new tasks */}
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded-l-lg p-3 flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white p-3 rounded-r-lg hover:bg-indigo-600 transition-all duration-300"
          >
            Add
          </button>
        </form>

        {/* Todo list */}
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 border rounded-lg shadow-md bg-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {/* If this task is being edited, show the input field */}
              {isEditing === index ? (
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="border p-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              ) : (
                <span onClick={() => toggleComplete(index)} className="cursor-pointer flex-grow">
                  {todo.text}
                </span>
              )}

              {/* Edit / Save Button */}
              {isEditing === index ? (
                <button
                  onClick={() => saveEdit(index)}
                  className="bg-green-500 text-white p-2 ml-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(index)}
                  className="bg-yellow-500 text-white p-2 ml-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
                >
                  Edit
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 text-white p-2 ml-2 rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
