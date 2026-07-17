from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.schemas import InterviewRequest
from services.interview_coach import generate_interview_prep

router = APIRouter()

@router.post("/generate-interview")
async def generate_interview_route(request: InterviewRequest):
    # Wrapped in StreamingResponse to stream tokens to the frontend in real-time
    return StreamingResponse(
        generate_interview_prep(request.role), 
        media_type="text/event-stream"
    )