import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Task.css'

const TaskAdd = () => {
  const url = 'https://project-prism.onrender.com';
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
      const response = await fetch(`${url}/task/project/${projectId}`, {
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
      <div className='task-head'>
        <h2>Add Task</h2>
      </div>
      <form className='form-cont' onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label for="exampleInputId">ID</label>
          <input type='number' className="form-control" id="exampleInputId" name='task_id' value={formData.task_id} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputName">Name</label>
          <input type="text" className="form-control" id="exampleInputName" name="task_name" value={formData.task_name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputStatus">Status</label>
          <input type="text" className="form-control" id="exampleInputStatus" name="status" value={formData.status} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputEmployeeName">Employee Name</label>
          <input type="text" className="form-control" id="exampleInputEmployeeName" name="employee_name" value={formData.employee_name} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
}

export default TaskAdd