import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ProjectView = () => {
    const [projects, setProjects] = useState([])
    const [manager, setManager] = useState('')

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/projects');
            const data = await response.json();
            // console.log(data);
            setProjects(data)
        }
        catch (error) {
            console.error('Error fetching Projects:', error);
        }
    }

    const fetchManger = async (manager_id) => {
        try {
            manager_id = Number(manager_id)
            const response = await fetch(`http://127.0.0.1:5000/portfolio-manager/${manager_id}`);
            const data = await response.json();
            // console.log(data);
            setManager(data.name)
        }
        catch (error) {
            console.error('Error fetching Portfolio Managers:', error);
        }
    }

    function getManager(manager_id){
        if(manager_id == 0) return 'Not Have'
        fetchManger(manager_id);
        return manager;
    }

    const handleDeleteManager = async (projectId) => {
        try{
            const response = await fetch(`http://127.0.0.1:5000/project/${projectId}`, {
                method: 'DELETE',
            });
            if(response.ok){
                setProjects((prevProjects) => 
                    prevProjects.filter((project) => project.project_id != projectId)
                );
                alert('Project deleted successfully!');
            } else {
                alert('Error deleting Project. Please try again.');
            }
        }
        catch(error){
            console.error('Error deleting Project:', error)
        }
    }


    return (
        <div>
            <h2>View Projects</h2>
            <Link to="/add-project"> <button>Create Project</button> </Link>
            <div>
                {projects.map((project) => (
                    <div key={project.project_id} style={{ border: '1px solid black', margin: '20px', padding: '10px' }}>
                        <h3>Name: {project.project_name}</h3>
                        <p>Status: {project.status}</p>
                        <p>Start Date: {project.start_date}</p>
                        <p>End Date: {project.end_date}</p>
                        {/* <p>Manager name: {getManager(project.manager_id)}</p> */}
                        <Link to={`/update-project/${project.project_id}`}> <button>Update</button> </Link>
                        <button onClick={() => handleDeleteManager(project.project_id)}> Delete </button>
                        <Link to={`/view-task/${project.project_id}`}> <button>Tasks</button> </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectView