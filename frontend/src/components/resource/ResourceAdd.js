import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResourceAdd = () => {
  const url = 'https://project-prism.onrender.com';
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    resource_id: 0,
    resource_name: '',
    description: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event) => {
    formData.resource_id = Number(formData.resource_id)
    formData.task_id = Number(taskId)

    event.preventDefault();
    try {
      const response = await fetch(`${url}/resource/task/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({
          resource_id: 0,
          resource_name: '',
          description: '',
        });
        alert('New Resource added successfully!')
        navigate(`/view-resource/${taskId}`)
      }
      else {
        alert('Error adding resource. Please try again.')
      }

    } catch (error) {
      console.log('Error adding resource:', error);
    }
  }


  return (
    <div>
      <div className='task-head'>
        <h2>Add Resource</h2>
      </div>
      <form className='form-cont' onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label for="exampleInputId">ID</label>
          <input type='number' className="form-control" id="exampleInputId" name='resource_id' value={formData.resource_id} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputName">Name</label>
          <input type="text" className="form-control" id="exampleInputName" name="resource_name" value={formData.resource_name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputDes">Description</label>
          <input type="text" className="form-control" id="exampleInputDes" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Add Resource</button>
      </form>
    </div>
  );
}

export default ResourceAdd