import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Task.css'

const TaskViewAll = () => {
  const url = 'https://project-prism.onrender.com';
    const [tasks, setTasks] = useState([])
  
    useEffect(() => {
      fetchTask();
    }, []);
  
    const fetchTask = async () => {
      try {
        const response = await fetch(`${url}/tasks`);
        const data = await response.json();
        console.log(data);
        setTasks(data)
      }
      catch (error) {
        console.error('Error fetching Tasks:', error);
      }
    }
  
    const handleDeleteManager = async (taskId) => {
      try {
        const response = await fetch(`${url}/task/${taskId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setTasks((prevtasks) =>
            prevtasks.filter((task) => task.task_id != taskId)
          );
          alert('Task deleted successfully!');
        } else {
          alert('Error deleting task. Please try again.');
        }
      }
      catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  
    return (
      <div>
        <div className='task-head'>
        <h2>View Tasks</h2>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Actions</th>
            <th scope="col">Resource</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.task_name}</td>
              <td>{task.status}</td>
              <td>{task.employee_name}</td>
              <td><Link to={`/update-task/${task.task_id}`}> <button className='update'>Update</button> </Link>
                <button className='delete' onClick={() => handleDeleteManager(task.task_id)}> Delete </button></td>
              <td><Link to={`/view-resource/${task.task_id}`}> <button className='task-resource'> Resource </button> </Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
}

export default TaskViewAll