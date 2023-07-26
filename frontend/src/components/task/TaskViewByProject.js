import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Task.css'

const TaskViewByProject = () => {
  const url = 'https://project-prism.onrender.com';
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])
  const { projectId } = useParams();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${url}/task/project/${projectId}`);
      const data = await response.json();
      // console.log(data[0].message);
      if (data[0].message == `Not find any task with project id: ${projectId}`) {
        setFlag(true)
      }
      else {
        setTasks(data)
      }
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
        <Link to={`/add-task/${projectId}`}> <button className='create'>Create task</button> </Link>
      </div>
      {
        flag == true ? (
          <div class="alert alert-danger" role="alert" > <h4> Not find any task for this project, Please create a task. </h4> </div>
        ) : (
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
        )
      }
        <button type="button" class="btn btn-outline-dark" onClick={() => navigate('/view-projects')}>Go back</button>
    </div>
  );

}

export default TaskViewByProject