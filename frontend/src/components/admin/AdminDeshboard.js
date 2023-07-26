import React, { useEffect, useState } from 'react'
import './Admin.css'

const AdminDeshboard = () => {
    const url = 'https://project-prism.onrender.com';
    const [manager, setManager] = useState({
        number: 0,
        active: 0,
        inactive: 0,
    })

    const [project, setProject] = useState({
        project: 0,
        assign: 0,
        notassign: 0,
    })

    const [task, setTask] = useState({
        task: 0,
        complete: 0,
        incomplete: 0,
    })

    const [resource, setResource] = useState(0)

    useEffect(() => {
        fetchPortfolioManagers();
        fetchProject();
        fetchTask();
        fetchResource();
    }, []);

    const fetchPortfolioManagers = async () => {
        try {
            const response = await fetch(`${url}/portfolio-managers`);
            const data = await response.json();

            if (data.length == 0) {
                setManager({
                    manager: 0,
                    active: 0,
                    inactive: 0,
                })
            }
            else {
                var length = data.length;
                var active = 0;
                var inactive = 0;
                data.forEach((manager) => manager.status == 'Active' ? active += 1 : inactive += 1);
                setManager({
                    manager: length,
                    active: active,
                    inactive: inactive,
                })
            }

        } catch (error) {
            console.error('Error fetching Portfolio Managers:', error);
        }
    };

    const fetchProject = async () => {
        try {
            const response = await fetch(`${url}/projects`);
            const data = await response.json();

            if (data.length == 0) {
                setProject({
                    project: 0,
                    assign: 0,
                    notassign: 0,
                })
            }
            else {
                var length = data.length;
                var assign = 0;
                var notassign = 0;
                data.forEach((project) => project.manager_id != 0 ? assign += 1 : notassign += 1);
                setProject({
                    project: length,
                    assign: assign,
                    notassign: notassign,
                })
            }

        }
        catch (error) {
            console.error('Error fetching Projects:', error);
        }
    }

    const fetchTask = async () => {
        try {
            const response = await fetch(`${url}/tasks`);
            const data = await response.json();

            if (data.length == 0) {
                setTask({
                    task: 0,
                    complete: 0,
                    incomplete: 0,
                })
            }
            else {
                var length = data.length;
                var complete = 0;
                var incomplete = 0;
                data.forEach((task) => task.status == 'Complete' ? complete += 1 : incomplete += 1);
                setTask({
                    task: length,
                    complete: complete,
                    incomplete: incomplete,
                })
            }

        }
        catch (error) {
            console.error('Error fetching Tasks:', error);
        }
    }

    const fetchResource = async () => {
        try {
          const response = await fetch(`${url}/resources`);
          const data = await response.json();

          if (data.length == 0) {
            setResource(0)
        }
        else {
            setResource(data.length)
        }

        }
        catch (error) {
          console.error('Error fetching Resources:', error);
        }
        
    }

    return (
        <div className='cont'>

            <div className='cont-div' style={{backgroundColor:'#00ab66'}}>
                <div className='top'>
                    <h2>Manager</h2>
                    <h1>{manager.manager}</h1>
                </div>
                <div className='bottom'>
                    <h5>Active: {manager.active}</h5>
                    <h5>Inactive: {manager.inactive}</h5>
                </div>
            </div>

            <div className='cont-div' style={{backgroundColor:'#de8500'}}>
                <div className='top'>
                    <h2>Project</h2>
                    <h1>{project.project}</h1>
                </div>
                <div className='bottom'>
                    <h5>Assign: {project.assign}</h5>
                    <h5>Not assign: {project.notassign}</h5>
                </div>
            </div>

            <div className='cont-div' style={{backgroundColor:'#de1e00'}}>
                <div className='top'>
                    <h2>Task</h2>
                    <h1>{task.task}</h1>
                </div>
                <div className='bottom'>
                    <h5>Complete: {task.complete}</h5>
                    <h5>Incomplete: {task.incomplete}</h5>
                </div>
            </div>

            <div className='cont-div' style={{backgroundColor:'#007a00'}}>
                <div className='top'>
                    <h2>Resource</h2>
                    <h1>{resource}</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminDeshboard