import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectUpdate = () => {
    const url = 'https://project-prism.onrender.com';
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [formData, setFormData] = useState({
        status: '',
        end_date: '',
        manager_id: 0,
    })

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            const response = await fetch(`${url}/project/${projectId}`);
            const data = await response.json();
            // console.log(data);
            setFormData(data)
        }
        catch (error) {
            console.error('Error fetching Projects:', error);
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
            const response = await fetch(`${url}/project/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Project updated successfully!');
                navigate('/view-projects');
            } else {
                alert('Error updating Project. Please try again.');
            }
        } catch (error) {
            console.error('Error updating Project:', error);
        }
    };

    return (
        <div>
            <div className='manager-head'>
                <h2>Update Project</h2>
            </div>
            <form className='form-cont' onSubmit={handleFormSubmit}>

            <div className="form-group">
                    <label for="exampleInputStatus">Status</label>
                    <input type="text" className="form-control" id="exampleInputStatus" name="status" value={formData.status} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputEndDate">End date</label>
                    <input type="date" className="form-control" id="exampleInputEndDate" name="end_date" value={formData.end_date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label for="exampleInputId">Manager ID</label>
                    <input type='number' className="form-control" id="exampleInputId" name='manager_id' value={formData.manager_id} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Update Project</button>
            </form>
        </div>
    );

};

export default ProjectUpdate