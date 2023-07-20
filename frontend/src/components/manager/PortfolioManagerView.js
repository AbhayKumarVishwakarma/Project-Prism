import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For routing

const PortfolioManagerView = () => {
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        fetchPortfolioManagers();
    }, []);

    const fetchPortfolioManagers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/portfolio-managers');
            const data = await response.json();
            console.log(data)
            setManagers(data);
        } catch (error) {
            console.error('Error fetching Portfolio Managers:', error);
        }
    };

    const handleDeleteManager = async (managerId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/portfolio-manager/${managerId}`, {
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
            <h2>View Portfolio Managers</h2>
            <Link to="/add-portfolio-manager"> <button>Create Portfolio Manager</button> </Link>
            <div>
                {managers.map((manager) => (
                    <div key={manager.manager_id} style={{border: '1px solid black', margin: '20px', padding: '10px'}}>
                        <h3>Name: {manager['name']}</h3>
                        <p>Email: {manager.email}</p>
                        <p>Status: {manager.status}</p>
                        <p>Role: {manager.role}</p>
                        <p>Bio: {manager.bio}</p>
                        <p>Start Date: {manager.start_date}</p>
                        <Link to={`/update-portfolio-manager/${manager.manager_id}`}> <button>Update</button> </Link>
                        <button onClick={() => handleDeleteManager(manager.manager_id)}> Delete </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioManagerView;
