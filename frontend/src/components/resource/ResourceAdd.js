import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResourceAdd = () => {
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
      const response = await fetch(`http://127.0.0.1:5000/resource/task/${taskId}`, {
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
      <h2>Add Resource</h2>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <label> ID: <input type='number' name='resource_id' value={formData.resource_id} onChange={handleInputChange} required /> </label>
        <label> Name: <input type="text" name="resource_name" value={formData.resource_name} onChange={handleInputChange} required /> </label>
        <label> Description: <input type="text" name="description" value={formData.description} onChange={handleInputChange} required /> </label>
        
        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
}

export default ResourceAdd