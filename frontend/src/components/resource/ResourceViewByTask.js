import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ResourceViewByTask = () => {
    const [resources, setResources] = useState([])
    const { taskId } = useParams();

    useEffect(() => {
        fetchResource();
    }, []);

    const fetchResource = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/resource/task/${taskId}`);
            const data = await response.json();
            console.log(data);
            setResources(data)
        }
        catch (error) {
            console.error('Error fetching Resources:', error);
        }
    }

    const handleDeleteManager = async (resourceId) => {
        console.log(resourceId)
        try {
            const response = await fetch(`http://127.0.0.1:5000/resource/${resourceId}`, {
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
        <h2>View Resources</h2>
        <Link to={`/add-resource/${taskId}`}> <button>Create Resource</button> </Link>
            <div>
                {resources.map((resource) => (
                    <div key={resource.resource_id} style={{ border: '1px solid black', margin: '20px', padding: '10px' }}>
                        <h3>Name: {resource.resource_name}</h3>
                        <p>Description: {resource.description}</p>
                        {/* <p>Manager name: {getManager(project.manager_id)}</p> */}
                        <Link to={`/update-resource/${resource.resource_id}`}> <button>Update</button> </Link>
                        <button onClick={() => handleDeleteManager(resource.resource_id)}> Delete </button>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default ResourceViewByTask