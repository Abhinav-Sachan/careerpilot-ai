# 1. Start with a lightweight Python environment
FROM python:3.12-slim

# 2. Create a folder inside the container called /app
WORKDIR /app

# 3. Copy your entire backend and frontend folders into the container
COPY backend /app/backend
COPY frontend /app/frontend

# 4. Move into the backend folder where requirements.txt lives
WORKDIR /app/backend

# 5. Install the Python packages needed to run the app
RUN pip install --no-cache-dir -r requirements.txt

# 6. Open up port 8000 (Standard for Render)
EXPOSE 8000

# 7. Start the FastAPI server on port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]