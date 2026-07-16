from fastapi import APIRouter
from models.schemas import RoadmapRequest
from services.roadmap_generator import generate_learning_roadmap

router = APIRouter()

@router.post("/generate-roadmap")
def generate_roadmap_route(request: RoadmapRequest):
    # This takes the career from the frontend and passes it to your AI function
    result = generate_learning_roadmap(request.career)
    return result