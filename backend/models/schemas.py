from pydantic import BaseModel

class ResumeRequest(BaseModel):
    resume_text: str

class InterviewRequest(BaseModel):
    role: str

class RoadmapRequest(BaseModel):
    career: str