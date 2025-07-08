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
    <div className="modal-overlay" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div className="modal-content" style={{background:'#fff',padding:'2rem',borderRadius:'8px',minWidth:'300px'}}>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
          />
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Task Description"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={taskData.completed}
              onChange={handleChange}
            />
            Completed
          </label>
          <div style={{marginTop:'1rem'}}>
            <button type="submit">Add Task</button>
            <button type="button" onClick={handleCancel} style={{marginLeft:'1rem'}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addmodel;
