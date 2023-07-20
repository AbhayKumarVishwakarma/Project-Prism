import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResourceUpdate = () => {
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
          const response = await fetch(`http://127.0.0.1:5000/resource/${resourceId}`);
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
      const response = await fetch(`http://127.0.0.1:5000/resource/${resourceId}`, {
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
      <h2>Update Resource</h2>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <label> Name: <input type="text" name="resource_name" value={formData.resource_name} onChange={handleInputChange} /> </label>
        <label> Description: <input type="text" name="description" value={formData.description} onChange={handleInputChange} /> </label>

        <button type="submit">Update Resource</button>
      </form>
    </div>
  )
}

export default ResourceUpdate