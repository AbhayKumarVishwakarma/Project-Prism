import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PortfolioManagerAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    manager_id: 0,
    name: '',
    email: '',
    status: '',
    role: '',
    bio: '',
    start_date: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/portfolio-manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          manager_id: '',
          name: '',
          email: '',
          status: '',
          role: '',
          bio: '',
          startDate: '',
        });
        alert('New Portfolio Manager added successfully!');
        navigate('/view-portfolio-managers');
      } else {
        alert('Error adding Portfolio Manager. Please try again.');
      }
    } catch (error) {
      console.error('Error adding Portfolio Manager:', error);
    }
  };

  return (
    <div>
      <h2>Add Portfolio Manager</h2>
      <form onSubmit={handleFormSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        
        <label> ID: <input type='number' name='manager_id' value={formData.manager_id} onChange={handleInputChange} required /> </label>
        <label> Name: <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/> </label>
        <label> Email: <input type="email" name="email" value={formData.email} onChange={handleInputChange} required/> </label>
        <label> Password: <input type="password" name="password" value={formData.password} onChange={handleInputChange} required/> </label>
        <label> Status: <input type="text" name="status" value={formData.status} onChange={handleInputChange} required/> </label>
        <label> Role: <input type="text" name="role" value={formData.role} onChange={handleInputChange} required/> </label>
        <label> Bio: <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} required/> </label>
        <label> Start Date: <input type="text" name="start_date" value={formData.start_date} onChange={handleInputChange} required/> </label>
        
        <button type="submit">Add Portfolio Manager</button>
      </form>
    </div>
  );
};

export default PortfolioManagerAdd;
