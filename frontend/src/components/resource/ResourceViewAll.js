import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Resource.css'

const ResourceViewAll = () => {
  const url = 'https://project-prism.onrender.com';
  const [resources, setResources] = useState([])

  useEffect(() => {
    fetchResource();
  }, []);

  const fetchResource = async () => {
    try {
      const response = await fetch(`${url}/resources`);
      const data = await response.json();
      console.log(data);
      setResources(data)
    }
    catch (error) {
      console.error('Error fetching Resources:', error);
    }
  }

  const handleDeleteManager = async (resourceId) => {
    try {
      const response = await fetch(`${url}/resource/${resourceId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setResources((prevResources) =>
          prevResources.filter((resource) => resource.resource_id != resourceId)
        );
        alert('Resource deleted successfully!');
      } else {
        alert('Error deleting resource. Please try again.');
      }
    }
    catch (error) {
      console.error('Error deleting resource:', error)
    }
  }


  return (
    <div>
      <div className='resource-head'>
        <h2>View Resources</h2>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.resource_id}>
              <td>{resource.resource_name}</td>
              <td>{resource.description}</td>
              <td><Link to={`/update-resource/${resource.resource_id}`}> <button className='update'>Update</button> </Link>
                <button className='delete' onClick={() => handleDeleteManager(resource.resource_id)}> Delete </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResourceViewAll