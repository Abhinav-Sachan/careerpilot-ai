from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.schemas import RoadmapRequest
from services.roadmap_generator import generate_learning_roadmap

router = APIRouter()

@router.post("/generate-roadmap")
async def generate_roadmap_route(request: RoadmapRequest):
    # Wrapped in StreamingResponse to stream tokens to the frontend in real-time
    return StreamingResponse(
        generate_learning_roadmap(request.career), 
        media_type="text/event-stream"
    )