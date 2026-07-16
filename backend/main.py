from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routes.resume import router as resume_router
from routes.interview import router as interview_router
from routes.roadmap import router as roadmap_router

app = FastAPI(
    title="CareerPilot AI API",
    description="AI powered career assistant",
    version="1.0.0"
)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. API Routes (These must be loaded before the static files)
app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(roadmap_router)

# 2. Serve Frontend Files
# This finds the exact path to your 'frontend' folder, no matter where the code is run.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# This tells FastAPI to serve your index.html, style.css, and script.js at the root URL (/)
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")