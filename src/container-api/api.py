from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import reqparse, Resource, Api
import os

user_id = 'user'

connString = "sqlite:///./test.db"
if os.environ.get("DB_HOST"):
    print("Using environment for connstring")
    user = os.environ.get("DB_USER")
    password = os.environ.get("DB_PASSWORD")
    host = os.environ.get("DB_HOST")
    connString = f"mysql://{user}:{password}@{host}/todo"

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'
app.config['SQLALCHEMY_DATABASE_URI'] = connString
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Text)
    completed = db.Column(db.Boolean)
    title = db.Column(db.Text)

    def to_dict(self):
        return dict(user_id = self.user_id, id = self.id, completed = self.completed, title = self.title)

# Creation of the database tables within the application context.
with app.app_context():
    db.create_all()

api = Api(app)

class AllTodosResource(Resource):
    def get(self):
        data = Todo.query.all()
        return list(map(lambda d: d.to_dict(), data))

    def post(self):
        todo = request.get_json()
        dbTodo = Todo(user_id = user_id, completed = todo['completed'], title = todo['title'])
        db.session.add(dbTodo)
        db.session.commit()
        return dbTodo.to_dict()

class TodoResource(Resource):
    def get(self, todo_id):
        data = Todo.query.filter_by(id=todo_id).first()
        if data is None:
            return None
        return data.to_dict()

    def delete(self, todo_id):
        Todo.query.filter_by(id = todo_id).delete()
        db.session.commit()

    def put(self, todo_id):
        todo = request.get_json()
        dbTodo = Todo.query.filter_by(id = todo_id)[0]
        dbTodo.completed = todo['completed']
        dbTodo.title = todo['title']
        db.session.commit()

api.add_resource(AllTodosResource, '/api/v1/todos')
api.add_resource(TodoResource, '/api/v1/todos/<int:todo_id>')

@app.route('/')
def index():
    return "ok"

@app.errorhandler(500)
def server_error(e):
    return repr(e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
