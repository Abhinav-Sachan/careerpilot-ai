from fastapi import APIRouter
from models.schemas import InterviewRequest
from services.interview_coach import generate_interview_prep

router = APIRouter()

@router.post("/generate-interview")
def generate_interview_route(request: InterviewRequest):
    # This takes the role from the frontend and passes it to your AI function
    result = generate_interview_prep(request.role)
    return result