import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectUpdate = () => {
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
            const response = await fetch(`http://127.0.0.1:5000/project/${projectId}`);
            const data = await response.json();
            console.log(data);
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
            const response = await fetch(`http://127.0.0.1:5000/project/${projectId}`, {
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
            <h2>Update Project</h2>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

                <label> Status: <input type="text" name="status" value={formData.status} onChange={handleInputChange} /> </label>
                <label> End Date: <input type="text" name="end_date" value={formData.end_date} onChange={handleInputChange} /> </label>
                <label> Manager ID: <input type="number" name="manager_id" value={formData.manager_id} onChange={handleInputChange} /> </label>

                <button type="submit">Update Portfolio Manager</button>
            </form>
        </div>
    );

};

export default ProjectUpdate