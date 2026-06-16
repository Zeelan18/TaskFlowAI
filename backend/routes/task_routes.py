from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)
from datetime import datetime

from models.user import db
from models.task import Task

task_bp = Blueprint(
    "task_bp",
    __name__
)


# CREATE TASK
@task_bp.route(
    "/create",
    methods=["POST"]
)
@jwt_required()
def create_task():

    current_user = int(get_jwt_identity())

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data received"
        }), 400

    deadline_str = data.get("deadline")

    if not deadline_str:
        return jsonify({
            "message": "Deadline is required"
        }), 400

    deadline = datetime.strptime(
        deadline_str,
        "%Y-%m-%d"
    ).date()

    task = Task(
        title=data.get("title"),
        description=data.get("description"),
        priority=data.get("priority", "Medium"),
        category=data.get("category"),
        deadline=deadline,
        user_id=current_user
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task Created Successfully"
    }), 201


# GET ALL TASKS
@task_bp.route(
    "/all",
    methods=["GET"]
)
@jwt_required()
def get_tasks():

    current_user = int(get_jwt_identity())

    tasks = Task.query.filter_by(
        user_id=current_user
    ).all()

    return jsonify([
        task.to_dict()
        for task in tasks
    ])


# UPDATE TASK

@task_bp.route(
    "/update/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def update_task(id):

    current_user = int(
        get_jwt_identity()
    )

    task = Task.query.filter_by(
        id=id,
        user_id=current_user
    ).first()

    if not task:

        return jsonify({
            "message": "Task Not Found"
        }), 404

    data = request.get_json()

    task.title = data.get(
        "title",
        task.title
    )

    task.description = data.get(
        "description",
        task.description
    )

    task.priority = data.get(
        "priority",
        task.priority
    )

    task.category = data.get(
        "category",
        task.category
    )

    if data.get("deadline"):

        task.deadline = datetime.strptime(
            data["deadline"],
            "%Y-%m-%d"
        ).date()

    db.session.commit()

    return jsonify({
        "message": "Task Updated Successfully"
    }), 200


# DELETE TASK
@task_bp.route(
    "/delete/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_task(id):

    current_user = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=id,
        user_id=current_user
    ).first()

    if not task:
        return jsonify({
            "message": "Task Not Found"
        }), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({
        "message": "Task Deleted Successfully"
    })
@task_bp.route(
    "/search",
    methods=["GET"]
)
@jwt_required()
def search_tasks():

    current_user = int(
        get_jwt_identity()
    )

    title = request.args.get(
        "title",
        ""
    )

    tasks = Task.query.filter(
        Task.user_id == current_user,
        Task.title.ilike(f"%{title}%")
    ).all()

    return jsonify([
        task.to_dict()
        for task in tasks
    ])
@task_bp.route(
    "/filter",
    methods=["GET"]
)
@jwt_required()
def filter_tasks():

    current_user = int(
        get_jwt_identity()
    )

    priority = request.args.get(
        "priority",
        ""
    )

    tasks = Task.query.filter_by(
        user_id=current_user,
        priority=priority
    ).all()

    return jsonify([
        task.to_dict()
        for task in tasks
    ])
@task_bp.route(
    "/complete/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def complete_task(id):

    current_user = int(
        get_jwt_identity()
    )

    task = Task.query.filter_by(
        id=id,
        user_id=current_user
    ).first()

    if not task:
        return jsonify({
            "message": "Task Not Found"
        }), 404

    task.status = "Completed"

    db.session.commit()

    return jsonify({
        "message": "Task Marked Completed"
    })