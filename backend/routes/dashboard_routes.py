from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models.task import Task

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)


@dashboard_bp.route(
    "/stats",
    methods=["GET"]
)
@jwt_required()
def get_stats():

    current_user = int(
        get_jwt_identity()
    )

    tasks = Task.query.filter_by(
        user_id=current_user
    ).all()

    total_tasks = len(tasks)

    completed_tasks = len([
        task for task in tasks
        if task.status == "Completed"
    ])

    pending_tasks = len([
        task for task in tasks
        if task.status == "Pending"
    ])

    high_priority = len([
        task for task in tasks
        if task.priority == "High"
    ])

    medium_priority = len([
        task for task in tasks
        if task.priority == "Medium"
    ])

    low_priority = len([
        task for task in tasks
        if task.priority == "Low"
    ])

    return jsonify({
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "high_priority": high_priority,
        "medium_priority": medium_priority,
        "low_priority": low_priority
    })