import { useState, useEffect } from "react";
import { getTasks, updateTask, deletetask, getTodayTasks } from "../services/taskServices";
import Addmodel from "./Addmodel";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState("all"); 

  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: !!task.completed,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const loadTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const loadTodayTasks = async () => {
    try {
      const response = await getTodayTasks();
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to load today's tasks:", err);
      alert("Failed to load today's tasks");
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTask({
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTaskId) {
      try {
        await updateTask(editTaskId, {
          ...editTask,
          completed: !!editTask.completed,
        });
        setEditTaskId(null);
        setEditTask({
          title: "",
          description: "",
          dueDate: "",
          completed: false,
        });
        if (view === 'all') {
          loadTasks();
        } else {
          loadTodayTasks();
        }
      } catch (err) {
        alert("Failed to update task");
      }
    } else {
      alert("Please select a task to edit");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task? ")) {
      try {
        await deletetask(id);
        if (view === 'all') {
          loadTasks();
        } else {
          loadTodayTasks();
        }
      } catch (err) {
        alert("Failed to delete task");
      }
    }
  };

  const handleAddTaskClick = () => setShowAddModal(true);
  const handleModalClose = () => setShowAddModal(false);
  const handleTaskAdded = () => {
    if (view === 'all') {
      loadTasks();
    } else {
      loadTodayTasks();
    }
    setShowAddModal(false);
  };

  useEffect(() => {
    if (view === 'all') {
      loadTasks();
    } else {
      loadTodayTasks();
    }
  }, [view]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div>
          <button
            onClick={() => setView('all')}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium mr-2 ${
              view === "all" && "bg-blue-700"
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setView('today')}
            className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium mr-2 ${
              view === "today" && "bg-red-700"
            }`}
          >
            Today's Tasks
          </button>
          <button
            onClick={handleAddTaskClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Task
          </button>
        </div>
      </div>
      {showAddModal && (
        <Addmodel onClose={handleModalClose} onTaskAdded={handleTaskAdded} />
      )}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => {
              if (editTaskId === task.id) {
                return (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        name="title"
                        value={editTask.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        name="description"
                        value={editTask.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="date"
                        name="dueDate"
                        value={editTask.dueDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        name="completed"
                        checked={editTask.completed}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={handleSubmit}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="ml-4 text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.completed
                            ? "bg-green-300 text-green-900"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(task)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;