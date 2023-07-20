import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskAdd = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    task_id: 0,
    task_name: '',
    status: '',
    employee_name: '',
    project_id: 0,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event) => {
    formData.task_id = Number(formData.task_id)
    formData.project_id = Number(projectId)
    
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/task/project/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({
          task_id: 0,
          task_name: '',
          status: '',
          employee_name: '',
          project_id: 0,
        });
        alert('New Task added successfully!')
        navigate(`/view-task/${projectId}`)
      }
      else {
        alert('Error adding Task. Please try again.')
      }

    } catch (error) {
      console.log('Error adding Task:', error);
    }
  }



  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <label> ID: <input type='number' name='task_id' value={formData.task_id} onChange={handleInputChange} required /> </label>
        <label> Name: <input type="text" name="task_name" value={formData.task_name} onChange={handleInputChange} required /> </label>
        <label> Status: <input type="text" name="status" value={formData.status} onChange={handleInputChange} required /> </label>
        <label> Employee Name: <input type='text' name='employee_name' value={formData.employee_name} onChange={handleInputChange} required /> </label>
        
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskAdd