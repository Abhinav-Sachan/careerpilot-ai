from fastapi import APIRouter

from models.schemas import ResumeRequest

from services.resume_analyzer import analyze_resume


router = APIRouter()


@router.post("/analyze-resume")
def analyze_resume_route(request: ResumeRequest):

    result = analyze_resume(request.resume_text)

    return result