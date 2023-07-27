# Project Prism **- Portfolio Management Application**

Project Prism is a user-friendly Portfolio Management Application that streamlines project and task management for portfolio managers. It offers full-stack web capabilities, allowing easy CRUD operations for project details and resources. Task management is independent for each project task, and resources can be efficiently allocated. The application features advanced project listing with filtering, sorting, and pagination. 

# Tech Stack

### Backend:

- Language: Python
- Framework: Flask
- Database: MongoDB
- ORM (Object-Relational Mapping): pymongo

### Frontend:

- JavaScript library: React
- UI framework: Bootstrap-UI


# Installation & Getting started
Detailed instructions on how to install, configure, and get the project running.

```
npm install project_pulse
cd project_pulse
npm start
```

# Usage
Provide instructions and examples on how to use your project.

```
Admin Login credential(hardCoded) is:-
username:-admin
password:-admin
```

# Entity Relationship Diagrams

<img src="https://github.com/AbhayKumarVishwakarma/Project-Prism/blob/main/frontend/src/components/image/ERD.png" alt="ERD" margin="0 auto" display="block" width="100%" height="auto" object-fit="contain">
<!-- ![ERD.png](https://drawsql.app/teams/ak-19/diagrams/er-diagram) -->

# API endpoints required

## Portfolio Manager Endpoints:

### Create a Portfolio Manager:

```
Method: POST
URL: /portfolio-manager
Description: Creates a new portfolio manager.
Request Body: {
    "manager_id": 1,
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "john@123",
    "status": "Active",
    "role": "Administrator",
    "bio": "I'm a senior developer",
    "start_date": "2022-01-01"
}

```

### Get all Portfolio Managers:

```
Method: GET
URL: /portfolio-managers
Description: Retrieves a list of all portfolio managers.

```

### Get a specific Portfolio Manager:

```
Method: GET
URL: /portfolio-manager/manager_id
Description: Retrieves a specific portfolio manager by ID.

```

### Update a Portfolio Manager:

```
Method: PUT
URL: /portfolio-manager/manager_id
Description: Updates the details of a specific portfolio manager by ID. You can change  any data of these four or all four.
Request Body: {
    "password": "john@007",
    "status": "Inactive",
    "role": "Viewer",
    "bio": "I'm a senior developer and Manager"
}

```

### Delete a Portfolio Manager:

```
Method: DELETE
URL: /portfolio-manager/manager_id
Description: Deletes a specific portfolio manager by ID.

```

## Project Endpoints:

### Create a Project:

```
Method: POST
URL: /project
Description: Creates a new project.
Request Body: {
    "project_id": 1,
    "project_name": "Zomato clone",
    "status": "Planned",
    "start_date": "2023-07-19",
    "end_date": "2023-07-26",
    "manager_id": 0
}

```

### Get all Projects:

```
Method: GET
URL: /projects
Description: Retrieves a list of all projects.

```

### Get a specific Project:

```
Method: GET
URL: /project/id
Description: Retrieves a specific project by ID.

```

### Get t Manager’s Project:

```
Method: GET
URL: /project/manager/manager_id
Description: Retrieves a specific project by Manager ID.
```

### Update a Project:

```
Method: PUT
URL: /project/id
Description: Updates the details of a specific project by ID.
Request Body: {
    "status": "In Progress",
    "end_date": "2022-06-01",
    "manager_id": "<manager id>"
}

```

### Delete a Project:

```
Method: DELETE
URL: /project/id
Description: Deletes a specific project by ID.

```

## Task Endpoints:

### Create a Task:

```
Method: POST
URL: /task/project/project_id
Description: Creates a new task.
Request Body: {
    "task_id": 1,
    "task_name": "Creating home page",
    "status": "In progress",
    "employee_name": "Ankit",
    "project_id": "1"
}

```

### Get all Tasks:

```
Method: GET
URL: /tasks
Description: Retrieves a list of all tasks.

```

### Get a specific Task:

```
Method: GET
URL: /task/task_id
Description: Retrieves a specific task by ID.

```

### Get a specific Task by Project

```
Method: GET
URL: /task/project/project_id
Description: Retrieves a specific task by project ID.
```

### Update a Task:

```
Method: PUT
URL: /task/task_id
Description: Updates the details of a specific task by ID.
Request Body: {
    "status": "In Progress"
}

```

### Delete a Task:

```
Method: DELETE
URL: /task/task_id
Description: Deletes a specific task by ID.

```

## Resource Endpoints:

### Create a Resource:

```
Method: POST
URL: /resource/task/task_id
Description: Creates a new resource.
Request Body: {
    "resource_id": 1,
    "resource_name": "image",
    "description": "www.image.com",
    "task_id": 1
}

```

### Get all Resources:

```
Method: GET
URL: /resources
Description: Retrieves a list of all resources.

```

### Get a specific Resource:

```
Method: GET
URL: /resource/resource_id
Description: Retrieves a specific resource by ID.

```

### Get task’s Resource:

```
Method: GET
URL: /resource/task/task_id
Description: Retrieves a specific resource by ID.
```

### Update a Resource:

```
Method: PUT
URL: /resource/resource_id
Description: Updates the details of a specific resource by ID.
Request Body: {
    "resource_name": "Document",
    "description": "Look at the official documentation"
}

```

### Delete a Resource:

```
Method: DELETE
URL: /resource/resource_id
Description: Deletes a specific resource by ID.

```

