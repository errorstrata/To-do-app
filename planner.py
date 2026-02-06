from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///planner.db'
db = SQLAlchemy(app)

class tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(20), nullable=True) 

with app.app_context():
    db.create_all()

class TaskList(Resource):
    def get(self):
        tasks_list = tasks.query.all()
        return jsonify([{'id': task.id, 'task': task.task, 'date': task.date} for task in tasks_list])

    def post(self):
        data = request.get_json()
        new_task = tasks(task=data['task'], date=data['date'])
        db.session.add(new_task)
        db.session.commit()
        return {'message': 'task added  successfully'}
  
api.add_resource(TaskList, '/tasks')

if __name__ == '__main__':
    app.run(debug=True)