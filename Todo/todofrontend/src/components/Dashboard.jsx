import {useState, useEffect} from "react";
import { getTasks } from "../services/taskServices";



function Dashboard(){
    const[tasks, settasks] = useState([]);


    const loadTasks = async () => {
        const response = await getTasks();
        settasks(response.data);
    }

    useEffect(()=>{
        loadTasks();
    },[]);

    return(
        <div>
            <h2>Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Task Description</td>
                        <td>Due Date</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.duDate}</td>
                            <td>{task.completed == 1 ? "Completed" : "Pending"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Dashboard;