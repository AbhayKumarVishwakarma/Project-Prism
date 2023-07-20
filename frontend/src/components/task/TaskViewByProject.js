import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const TaskViewByProject = () => {
  const [tasks, setTasks] = useState([])
  const { projectId } = useParams();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/task/project/${projectId}`);
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
      const response = await fetch(`http://127.0.0.1:5000/task/${taskId}`, {
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
      <h2>View Tasks</h2>
      <Link to={`/add-task/${projectId}`}> <button>Create task</button> </Link>
      <div>
        {tasks.map((task) => (
          <div key={task.task_id} style={{ border: '1px solid black', margin: '20px', padding: '10px' }}>
            <h3>Name: {task.task_name}</h3>
            <p>Status: {task.status}</p>
            <p>Employee Name: {task.employee_name}</p>
            {/* <p>Manager name: {getManager(project.manager_id)}</p> */}
            <Link to={`/update-task/${task.task_id}`}> <button>Update</button> </Link>
            <button onClick={() => handleDeleteManager(task.task_id)}> Delete </button>
            <Link to={`/view-resource/${task.task_id}`}> <button> Resource </button> </Link>
          </div>
        ))}
      </div>
    </div>
  );

}

export default TaskViewByProject