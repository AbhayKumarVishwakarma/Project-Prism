import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Task.css'

const TaskUpdate = () => {
  const url = 'https://project-prism.onrender.com';
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    status: ''
  })

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${url}/task/${taskId}`);
      const data = await response.json();
      // console.log(data);
      setFormData(data)
    }
    catch (error) {
      console.error('Error fetching Tasks:', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData)
    try {
      const response = await fetch(`${url}/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Task updated successfully!');
        navigate(`/view-task/${formData.project_id}`);
      } else {
        alert('Error updating task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <div>
      <div className='task-head'>
        <h2>Update Task</h2>
      </div>
      <form className='form-cont' onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label for="exampleInputStatus">Status</label>
          <input type="text" className="form-control" id="exampleInputStatus" name="status" value={formData.status} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  )
}

export default TaskUpdate