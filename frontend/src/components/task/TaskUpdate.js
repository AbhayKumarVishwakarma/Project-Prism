import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskUpdate = () => {
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
      const response = await fetch(`http://127.0.0.1:5000/task/${taskId}`);
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
      const response = await fetch(`http://127.0.0.1:5000/task/${taskId}`, {
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
      <h2>Update Task</h2>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <label> Status: <input type="text" name="status" value={formData.status} onChange={handleInputChange} /> </label>

        <button type="submit">Update Task</button>
      </form>
    </div>
  )
}

export default TaskUpdate