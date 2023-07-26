import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ResourceViewByTask = () => {
  const url = 'https://project-prism.onrender.com';
  const navigate = useNavigate();
  const [resources, setResources] = useState([])
  const { taskId } = useParams();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchResource();
  }, []);

  const fetchResource = async () => {
    try {
      const response = await fetch(`${url}/resource/task/${taskId}`);
      const data = await response.json();
      // console.log(data);
      if (data[0].message == `Not find any resource!`) {
        setFlag(true)
      }
      else {
        setResources(data)
      }

    }
    catch (error) {
      console.error('Error fetching Resources:', error);
    }
  }

  const handleDeleteManager = async (resourceId) => {
    console.log(resourceId)
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
        <Link to={`/add-resource/${taskId}`}> <button className='create'>Create Resource</button> </Link>
      </div>

      {
        flag == true ? (
          <div class="alert alert-danger" role="alert" > <h4> Not find any resource for this task, Please create a resource. </h4> </div>
        ) : (

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

        )
      }
      <button type="button" class="btn btn-outline-dark" onClick={() => navigate('/view-tasks')}>Go back</button>

    </div>
  )
}

export default ResourceViewByTask