from flask import Flask

from models.task import Task

from routes.task_routes import task_bp
from routes.dashboard_routes import dashboard_bp
from routes.ai_routes import ai_bp

from flask_cors import CORS

from flask_bcrypt import Bcrypt

from flask_jwt_extended import JWTManager

from config.config import Config

from models.user import db

from routes.auth_routes import auth_bp


app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)

db.init_app(app)

app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    task_bp,
    url_prefix="/api/tasks"
)

app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
)

app.register_blueprint(
    ai_bp,
    url_prefix="/api/ai"
)


@app.route("/")
def home():

    return {
        "message": "TaskFlow AI Backend Running Successfully"
    }


with app.app_context():

    db.create_all()


if __name__ == "__main__":

    app.run(
        debug=True
    )