import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Project.css';

const ProjectViewByManager = () => {
    const url = 'https://project-prism.onrender.com';
    const [projects, setProjects] = useState([])
    const { managerId } = useParams()

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            const response = await fetch(`${url}/project/manager/${managerId}`);
            const data = await response.json();
            console.log(data);
            setProjects(data)
        }
        catch (error) {
            console.error('Error fetching Projects:', error);
        }
    }

    const handleDeleteManager = async (projectId) => {
        try {
            const response = await fetch(`${url}/project/${projectId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project.project_id != projectId)
                );
                alert('Project deleted successfully!');
            } else {
                alert('Error deleting Project. Please try again.');
            }
        }
        catch (error) {
            console.error('Error deleting Project:', error)
        }
    }

    return (
        <div>
            <div className='project-head'>
                <h2>View Projects</h2>
                <Link to="/add-project"> <button className='create'>Create Project</button> </Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Task</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.project_id}>
                            <td>{project.project_name}</td>
                            <td>{project.status}</td>
                            <td>{project.start_date}</td>
                            <td>{project.end_date}</td>
                            <td><Link to={`/update-project/${project.project_id}`}> <button className='update'>Update</button> </Link>
                                <button  className='delete' onClick={() => handleDeleteManager(project.project_id)}> Delete </button></td>
                            <td><Link to={`/view-task/${project.project_id}`}> <button className='project-task'>Tasks</button> </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ProjectViewByManager