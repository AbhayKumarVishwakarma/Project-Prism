from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mongo_uri = 'mongodb+srv://root:root@cluster0.tktlftp.mongodb.net/?retryWrites=true&w=majority'

client = MongoClient(mongo_uri)
db = client.Mongo


@app.route('/')
def welcome():
    return 'Welcome to Project Prism!'


@app.route('/portfolio-manager', methods=['POST'])
def create_portfolio_manager():
    data = request.get_json()

    if 'manager_id' not in data or 'name' not in data or 'email' not in data or 'status' not in data or \
            'role' not in data or 'bio' not in data or 'start_date' not in data:
        return jsonify({'message': 'Error, Invalid data'}), 400

    db.manager.insert_one(data)
    return jsonify([{'message': 'New manager created successfully!'}])


@app.route('/portfolio-managers', methods=['GET'])
def view_all_portfolio_managers():
    managers = list(db.manager.find({}))

    if len(managers) == 0:
        return jsonify([{'message': 'Not find any manager!'}]), 404

    for manager in managers:
        manager['_id'] = str(manager['_id'])

    return jsonify(managers)


@app.route('/portfolio-manager/<int:manager_id>', methods=['GET'])
def view_portfolio_manager(manager_id):
    manager = db.manager.find_one({'manager_id': manager_id})

    if manager is None:
        return jsonify([{f'message': f'Not find any manager with id: {manager_id}!'}]), 404

    manager['_id'] = str(manager['_id'])
    return jsonify(manager)


@app.route('/portfolio-manager/<int:manager_id>', methods=['PUT'])
def update_portfolio_manager(manager_id):
    manager = db.manager.find_one({'manager_id': manager_id})

    if manager is None:
        return jsonify([{'message': f'Not find any manager with id: {manager_id}!'}]), 404

    data = request.get_json()
    updated_data = {}
    if 'password' in data: updated_data['password'] = data['password']
    if 'status' in data: updated_data['status'] = data['status']
    if 'role' in data: updated_data['role'] = data['role']
    if 'bio' in data: updated_data['bio'] = data['bio']

    if updated_data:
        db.manager.update_one({'manager_id': manager_id}, {'$set': updated_data})

    return jsonify([{'message': f'Manager with id: {manager_id} is updated!'}])


@app.route('/portfolio-manager/<int:manager_id>', methods=['DELETE'])
def delete_portfolio_manager(manager_id):
    manager = db.manager.find_one({'manager_id': manager_id})

    if manager is None:
        return jsonify([{'message': f'Not find any manager with id: {manager_id}!'}]), 404

    db.manager.delete_one({'manager_id': manager_id})
    return jsonify({'message': f'Manager with id: {manager_id} is deleted!'})


# ---- Project ----
@app.route('/project', methods=['POST'])
def create_project():
    data = request.get_json()

    if 'project_id' not in data or 'project_name' not in data or 'status' not in data or \
            'start_date' not in data or 'end_date' not in data:
        return jsonify({'message': 'Error, Invalid data'}), 400

    db.project.insert_one(data)
    return jsonify([{'message': 'New project created successfully!'}])


@app.route('/project/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    project = db.project.find_one({'project_id': project_id})

    if project is None:
        return jsonify([{'message': f'Not find any project with id: {project_id}!'}]), 404

    data = request.get_json()
    updated_data = {}
    if 'manager_id' in data: updated_data['manager_id'] = data['manager_id']
    if 'status' in data: updated_data['status'] = data['status']
    if 'end_date' in data: updated_data['end_date'] = data['end_date']

    if updated_data:
        db.project.update_one({'project_id': project_id}, {'$set': updated_data})

    return jsonify([{'message': f'Project with id: {project_id} is updated!'}])


@app.route('/project/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = db.project.find_one({'project_id': project_id})

    if project is None:
        return jsonify([{'message': f'Not find any project with id: {project_id}!'}]), 404

    db.project.delete_one({'project_id': project_id})
    return jsonify([{'message': f'Project with id: {project_id} is deleted!'}])


@app.route('/projects', methods=['GET'])
def view_all_project():
    projects = list(db.project.find({}))

    if len(projects) == 0:
        return jsonify([{'message': 'Not find any project!'}]), 404

    for project in projects:
        project['_id'] = str(project['_id'])

    return jsonify(projects)


@app.route('/project/<int:project_id>', methods=['GET'])
def view_project(project_id):
    project = db.project.find_one({'project_id': project_id})

    if project is None:
        return jsonify([{f'message': f'Not find any project with id: {project_id}!'}]), 404

    project['_id'] = str(project['_id'])
    return jsonify(project)


@app.route('/project/manager/<int:manager_id>', methods=['GET'])
def view_projectByManagerId(manager_id):
    projects = list(db.project.find({'manager_id': manager_id}))

    if len(projects) == 0:
        return jsonify([{'message': 'Not find any project!'}]), 404

    for project in projects:
        project['_id'] = str(project['_id'])

    return jsonify(projects)


# ---- Task ----
@app.route('/task/project/<int:project_id>', methods=['POST'])
def create_task(project_id):
    data = request.get_json()

    if 'task_id' not in data or 'task_name' not in data or 'status' not in data or 'employee_name' not in data:
        return jsonify([{'message': 'Error, Invalid data'}]), 400

    data['project_id'] = project_id

    # print(data)
    db.task.insert_one(data)
    return jsonify([{'message': 'New task created successfully!'}])


@app.route('/task/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = db.task.find_one({'task_id': task_id})

    if task is None:
        return jsonify([{'message': f'Not find any task with id: {task_id}!'}]), 404

    data = request.get_json()
    db.task.update_one({'task_id': task_id}, {'$set': {'status': data['status']}})

    return jsonify([{'message': f'Task with id: {task_id} is updated!'}])


@app.route('/task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = db.task.find_one({'task_id': task_id})

    if task is None:
        return jsonify([{'message': f'Not find any task with id: {task_id}!'}]), 404

    db.task.delete_one({'task_id': task_id})
    return jsonify([{'message': f'Task with id: {task_id} is deleted!'}])


@app.route('/tasks', methods=['GET'])
def view_all_task():
    tasks = list(db.task.find({}))

    if len(tasks) == 0:
        return jsonify([{'message': 'Not find any task!'}]), 404

    for task in tasks:
        task['_id'] = str(task['_id'])

    return jsonify(tasks)


@app.route('/task/<int:task_id>', methods=['GET'])
def view_taskById(task_id):
    task = db.task.find_one({'task_id': task_id})

    if task is None:
        return jsonify([{f'message': f'Not find any task with id: {task_id}!'}]), 404

    task['_id'] = str(task['_id'])
    return jsonify(task)


@app.route('/task/project/<int:project_id>', methods=['GET'])
def view_taskByProjectId(project_id):
    tasks = list(db.task.find({'project_id': project_id}))

    if len(tasks) == 0:
        return jsonify([{f'message': f'Not find any task with project id: {project_id}'}]), 404

    for task in tasks:
        task['_id'] = str(task['_id'])

    return jsonify(tasks)


# ---- Resource ----
@app.route('/resource/task/<int:task_id>', methods=['POST'])
def create_resource(task_id):
    data = request.get_json()

    if 'resource_id' not in data or 'resource_name' not in data or 'description' not in data:
        return jsonify([{'message': 'Error, Invalid data'}]), 400

    data['task_id'] = task_id
    db.resource.insert_one(data)
    return jsonify([{'message': 'New resource created successfully!'}])


@app.route('/resource/<int:resource_id>', methods=['PUT'])
def update_resource(resource_id):
    resource = db.resource.find_one({'resource_id': resource_id})

    if resource is None:
        return jsonify([{'message': f'Not find any resource with id: {resource}!'}]), 404

    data = request.get_json()
    updated_data = {}
    if 'resource_name' in data: updated_data['resource_name'] = data['resource_name']
    if 'description' in data: updated_data['description'] = data['description']

    if updated_data:
        db.resource.update_one({'resource_id': resource_id}, {'$set': updated_data})

    return jsonify([{'message': f'Resource with id: {resource_id} is updated!'}])


@app.route('/resource/<int:resource_id>', methods=['DELETE'])
def delete_resource(resource_id):
    resource = db.resource.find_one({'resource_id': resource_id})

    if resource is None:
        return jsonify([{'message': f'Not find any resource with id: {resource_id}!'}]), 404

    db.resource.delete_one({'resource_id': resource_id})
    return jsonify([{'message': f'Resource with id: {resource_id} is deleted!'}])


@app.route('/resources', methods=['GET'])
def view_all_resource():
    resources = list(db.resource.find({}))

    if len(resources) == 0:
        return jsonify([{'message': 'Not find any resource!'}]), 404

    for resource in resources:
        resource['_id'] = str(resource['_id'])

    return jsonify(resources)


@app.route('/resource/<int:resource_id>', methods=['GET'])
def view_resourceById(resource_id):
    resource = db.resource.find_one({'resource_id': resource_id})

    if resource is None:
        return jsonify([{f'message': f'Not find any resource with id: {resource_id}!'}]), 404

    resource['_id'] = str(resource['_id'])
    return jsonify(resource)


@app.route('/resource/task/<int:task_id>', methods=['GET'])
def view_resourceByTaskId(task_id):
    resources = list(db.resource.find({'task_id': task_id}))

    if len(resources) == 0:
        return jsonify([{'message': 'Not find any resource!'}]), 404

    for resource in resources:
        resource['_id'] = str(resource['_id'])

    return jsonify(resources)


if __name__ == '__main__':
    app.run(debug=True)
