import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectAdd = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        project_id: 0,
        project_name: '',
        status: '',
        start_date: '',
        end_date: '',
        manager_id: 0,
    })

    const handleInputChange = (event)=> {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (event) => {
        formData.project_id = Number(formData.project_id)
        formData.manager_id = Number(formData.manager_id)
        // console.log(formData)
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                setFormData({
                    project_id: 0,
                    project_name: '',
                    status: '',
                    start_date: '',
                    end_date: '',
                    manager_id: 0,
                });
                alert('New Project added successfully!')
                navigate('/view-projects')
            }
            else{
                alert('Error adding Project. Please try again.')
            }

        } catch (error) {
            console.log('Error adding Project:', error);
        }
    }

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <label> ID: <input type='number' name='project_id' value={formData.project_id} onChange={handleInputChange} required /> </label>
        <label> Name: <input type="text" name="project_name" value={formData.project_name} onChange={handleInputChange} required /> </label>
        <label> Status: <input type="text" name="status" value={formData.status} onChange={handleInputChange} required /> </label>
        <label> Start Date: <input type="text" name="start_date" value={formData.start_date} onChange={handleInputChange} required /> </label>
        <label> End Date: <input type='text' name='end_date' value={formData.end_date} onChange={handleInputChange} required /> </label>
        <label> ID: <input type='number' name='manager_id' value={formData.manager_id} onChange={handleInputChange} required /> </label>

        <button type="submit">Add Portfolio Manager</button>
      </form>
    </div>
  );
}

export default ProjectAdd