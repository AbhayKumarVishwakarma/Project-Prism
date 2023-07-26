import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResourceUpdate = () => {
  const url = 'https://project-prism.onrender.com';
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const [formData, setFormData] = useState({
    resource_name: "",
    description: ""
  })

  useEffect(() => {
    fetchResource();
  }, []);

  const fetchResource = async () => {
    try {
      const response = await fetch(`${url}/resource/${resourceId}`);
      const data = await response.json();
      console.log(data);
      setFormData(data)
    }
    catch (error) {
      console.error('Error fetching Resources:', error);
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
    console.log(formData)
    try {
      const response = await fetch(`${url}/resource/${resourceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Resource updated successfully!');
        navigate(`/view-resource/${formData.task_id}`);
      } else {
        alert('Error updating resource. Please try again.');
      }
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };



  return (
    <div>
      <div className='task-head'>
        <h2>Update Resource</h2>
      </div>
      <form className='form-cont' onSubmit={handleFormSubmit}>

      <div className="form-group">
          <label for="exampleInputName">Name</label>
          <input type="text" className="form-control" id="exampleInputName" name="resource_name" value={formData.resource_name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputDes">Description</label>
          <input type="text" className="form-control" id="exampleInputDes" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Update Resource</button>
      </form>
    </div>
  )
}

export default ResourceUpdate