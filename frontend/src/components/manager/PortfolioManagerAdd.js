import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortfolioManager.css'

const PortfolioManagerAdd = () => {
  const url = 'https://project-prism.onrender.com';
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
      const response = await fetch(`${url}/portfolio-manager`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          manager_id: 0,
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
      <div className='manager-head'>
        <h2>Add Portfolio Manager</h2>
      </div>
      <form className='form-cont' onSubmit={handleFormSubmit}>

        <div className="form-group">
          <label for="exampleInputId">ID</label>
          <input type='number' className="form-control" id="exampleInputId" name='manager_id' value={formData.manager_id} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputName">Name</label>
          <input type="text" className="form-control" id="exampleInputName" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputStatus">Status</label>
          <input type="text" className="form-control" id="exampleInputStatus" name="status" value={formData.status} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputRole">Role</label>
          <input type="text" className="form-control" id="exampleInputRole" name="role" value={formData.role} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputBio">Bio</label>
          <input type="text" className="form-control" id="exampleInputBio" name="bio" value={formData.bio} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label for="exampleInputStartDate">Start date</label>
          <input type="date" className="form-control" id="exampleInputStartDate" name="start_date" value={formData.start_date} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Add Portfolio Manager</button>
      </form>
    </div>
  );
};

export default PortfolioManagerAdd;
