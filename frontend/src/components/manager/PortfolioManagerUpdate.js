import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PortfolioManager.css'

const PortfolioManagerUpdate = () => {
  const url = 'https://project-prism.onrender.com';
  const navigate = useNavigate();
  const { managerId } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    status: '',
    role: '',
    bio: '',
  });

  useEffect(() => {
    fetchPortfolioManager();
  }, []);

  const fetchPortfolioManager = async () => {
    try {
      const response = await fetch(`${url}/portfolio-manager/${managerId}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching Portfolio Manager:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData)
    try {
      const response = await fetch(`${url}/portfolio-manager/${managerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Portfolio Manager updated successfully!');
        navigate('/view-portfolio-managers');
      } else {
        alert('Error updating Portfolio Manager. Please try again.');
      }
    } catch (error) {
      console.error('Error updating Portfolio Manager:', error);
    }
  };

  return (
    <div>
      <div className='manager-head'>
        <h2>Update Portfolio Manager</h2>
      </div>

      <form className='form-cont' onSubmit={handleFormSubmit}>
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
        <button type="submit" className="btn btn-primary">Update Portfolio Manager</button>
      </form>
    </div>
  );
};

export default PortfolioManagerUpdate;
