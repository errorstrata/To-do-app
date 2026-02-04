from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
api = Api(app)
jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = 'mykey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///planner.db'
db = SQLAlchemy(app)
class tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(20), nullable=True) 

class users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

with app.app_context():
    db.create_all()

class register(Resource):
    def post(self):
        data = request.get_json()
        new_user = users(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'user registered successfully'}

class login(Resource):
    def post(self):
        data = request.get_json()
        user = users.query.filter_by(username=data['username'], password=data['password']).first()

        if not user:
            return {'message': 'invalid username or password'}, 400
        
        token = create_access_token(identity=data['username'])
        return {'token': token}

class TaskList(Resource):
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        tasks_list = tasks.query.all()
        return jsonify([{'user': user}, [{'id': task.id, 'task': task.task, 'date': task.date} for task in tasks_list]])
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        new_task = tasks(task=data['task'], date=data['date'])
        db.session.add(new_task)
        db.session.commit()
        return {'message': 'task added  successfully'}

api.add_resource(TaskList, '/tasks')

if __name__ == '__main__':
    app.run(debug=True)