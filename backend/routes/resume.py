from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.schemas import ResumeRequest
from services.resume_analyzer import analyze_resume

router = APIRouter()

@router.post("/analyze-resume")
async def analyze_resume_route(request: ResumeRequest):
    # Wrapped in StreamingResponse to stream tokens to the frontend in real-time
    return StreamingResponse(
        analyze_resume(request.resume_text), 
        media_type="text/event-stream"
    )