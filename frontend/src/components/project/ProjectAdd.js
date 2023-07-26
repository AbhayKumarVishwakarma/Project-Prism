import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css'

const ProjectAdd = () => {
    const url = 'https://project-prism.onrender.com';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        project_id: 0,
        project_name: '',
        status: '',
        start_date: '',
        end_date: '',
        manager_id: 0,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
            const response = await fetch(`${url}/project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
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
            else {
                alert('Error adding Project. Please try again.')
            }

        } catch (error) {
            console.log('Error adding Project:', error);
        }
    }

    return (
        <div>
            <div className='manager-head'>
                <h2>Add Project</h2>
            </div>
            <form className='form-cont' onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

                <div className="form-group">
                    <label for="exampleInputId">ID</label>
                    <input type='number' className="form-control" id="exampleInputId" name='project_id' value={formData.project_id} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" name="project_name" value={formData.project_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputStatus">Status</label>
                    <input type="text" className="form-control" id="exampleInputStatus" name="status" value={formData.status} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputStartDate">Start date</label>
                    <input type="date" className="form-control" id="exampleInputStartDate" name="start_date" value={formData.start_date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputEndDate">End date</label>
                    <input type="date" className="form-control" id="exampleInputEndDate" name="end_date" value={formData.end_date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputId">Manager ID</label>
                    <input type='number' className="form-control" id="exampleInputId" name='manager_id' value={formData.manager_id} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Add Project</button>
            </form>
        </div>
    );
}

export default ProjectAdd