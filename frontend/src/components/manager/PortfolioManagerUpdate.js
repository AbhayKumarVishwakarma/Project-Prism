import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PortfolioManagerUpdate = () => {
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
      const response = await fetch(`http://127.0.0.1:5000/portfolio-manager/${managerId}`);
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
    console.log(formData)
    try {
      const response = await fetch(`http://127.0.0.1:5000/portfolio-manager/${managerId}`, {
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
      <h2>Update Portfolio Manager</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}}>
        
        <label> Password: <input type="password" name="password" value={formData.password} onChange={handleInputChange} /> </label>
        <label> Status: <input type="text" name="status" value={formData.status} onChange={handleInputChange} /> </label>
        <label> Role: <input type="text" name="role" value={formData.role} onChange={handleInputChange} /> </label>
        <label> Bio: <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} /> </label>

        <button type="submit">Update Portfolio Manager</button>
      </form>
    </div>
  );
};

export default PortfolioManagerUpdate;
