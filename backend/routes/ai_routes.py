from flask import Blueprint, request, jsonify

import google.generativeai as genai

from dotenv import load_dotenv

import os

load_dotenv()

ai_bp = Blueprint(
    "ai_bp",
    __name__
)

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "models/gemini-2.5-flash"
)


@ai_bp.route(
    "/generate-tasks",
    methods=["POST"]
)
def generate_tasks():

    try:

        data = request.get_json()

        project_title = data.get(
            "title",
            ""
        )

        if not project_title:

            return jsonify({
                "message": "Project title required"
            }), 400

        prompt = f"""
You are a senior project planning assistant.

Generate a task breakdown for:

{project_title}

Rules:
- Return only 8 to 12 tasks
- One task per line
- No numbering
- No explanations
- Keep tasks concise
- Focus on major milestones
"""

        response = model.generate_content(
            prompt
        )

        return jsonify({
            "tasks": response.text
        })

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500