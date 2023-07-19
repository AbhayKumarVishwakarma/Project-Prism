from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

mongo_uri = 'mongo_url'

client = MongoClient(mongo_uri)
db = client.Mongo


@app.route('/')
def welcome():
    return 'Welcome to Project Prism!'


@app.route('/portfolio-manager', methods=['POST'])
def create_portfolio_manager():
    data = request.get_json()

    if 'manager_id' not in data or 'name' not in data or 'email' not in data or 'status' not in data or \
            'role' not in data or 'bio' not in data or 'strDate' not in data:
        return jsonify({'message': 'Error, Invalid data'}), 400

    db.manager.insert_one(data)
    return jsonify({'message': 'New manager created successfully!'})


@app.route('/portfolio-managers', methods=['GET'])
def view_all_portfolio_managers():
    managers = list(db.manager.find({}))

    if len(managers) == 0:
        return jsonify({'message': 'Not find any manager!'}), 404

    for manager in managers:
        manager['_id'] = str(manager['_id'])

    return jsonify(managers)


@app.route('/portfolio-manager/<int:manager_id>', methods=['GET'])
def view_portfolio_manager(manager_id):
    manager = db.manager.find_one({'manager_id': manager_id})

    if manager is None:
        return jsonify({f'message': f'Not find any manager with id: {manager_id}!'}), 404

    manager['_id'] = str(manager['_id'])
    return jsonify(manager)


@app.route('/portfolio-manager/<int:manager_id>', methods=['PUT'])
def update_portfolio_manager(manager_id):
    manager = db.manager.find_one({'manager_id': manager_id})

    if manager is None:
        return jsonify({'message': f'Not find any manager with id: {manager_id}!'}), 404

    data = request.get_json()
    if 'password' in data: manager['password'] = data['password']
    if 'status' in data: manager['status'] = data['status']
    if 'role' in data: manager['role'] = data['role']
    if 'bio' in data: manager['bio'] = data['bio']

    db.manager.delete_one({'manager_id': manager_id})
    db.manager.insert_one(manager)

    return jsonify({'message': f'Manager with id: {manager_id} is updated!'})


@app.route('/portfolio-manager/<int:manager_id>', methods=['DELETE'])
def delete_portfolio_manager(manager_id):
    manager = db.manager.find_one({'manager_id': manager_id})

    if manager is None:
        return jsonify({'message': f'Not find any manager with id: {manager_id}!'}), 404

    db.manager.delete_one({'manager_id': manager_id})
    return jsonify({'message': f'Manager with id: {manager_id} is deleted!'})


if __name__ == '__main__':
    app.run(debug=True)
