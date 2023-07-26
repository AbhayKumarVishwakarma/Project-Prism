import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PortfolioManager.css'

const PortfolioManagerView = () => {
    const url = 'https://project-prism.onrender.com';
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        fetchPortfolioManagers();
    }, []);

    const fetchPortfolioManagers = async () => {
        try {
            const response = await fetch(`${url}/portfolio-managers`);
            const data = await response.json();
            // console.log(data)
            setManagers(data);
        } catch (error) {
            console.error('Error fetching Portfolio Managers:', error);
        }
    };

    const handleDeleteManager = async (managerId) => {
        try {
            const response = await fetch(`${url}/portfolio-manager/${managerId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setManagers((prevManagers) =>
                    prevManagers.filter((manager) => manager.manager_id !== managerId)
                );
                alert('Portfolio Manager deleted successfully!');
            } else {
                alert('Error deleting Portfolio Manager. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting Portfolio Manager:', error);
        }
    };

    return (
        <div>
            <div className='manager-head'>
                <h2>View Portfolio Managers</h2>
                <Link to="/add-portfolio-manager"> <button className='create'>Create Portfolio Manager</button> </Link>
            </div>

            <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Role</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {managers.map((manager) => (
                        <tr key={manager.manager_id}>
                            <td>{manager.name}</td>
                            <td>{manager.email}</td>
                            <td>{manager.status}</td>
                            <td>{manager.role}</td>
                            <td>{manager.bio}</td>
                            <td>{manager.start_date}</td>
                            <td><Link to={`/update-portfolio-manager/${manager.manager_id}`}> <button className='update'>Update</button> </Link>
                            <button className='delete' onClick={() => handleDeleteManager(manager.manager_id)}> Delete </button></td>
                        </tr>
                ))}
                    </tbody>
                </table>
        </div>
    );
};

export default PortfolioManagerView;
