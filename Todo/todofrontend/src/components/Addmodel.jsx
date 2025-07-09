import { useState } from "react";
import { addTask } from "../services/taskServices";

function Addmodel({ onClose, onTaskAdded }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = () => {
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    });
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(taskData);
      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
      if (onTaskAdded) onTaskAdded();
      if (onClose) onClose();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Task Description"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              checked={taskData.completed}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Completed</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Task</button>
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addmodel;
