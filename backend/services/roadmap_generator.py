import json
from services.ai_client import ask_ai

def generate_learning_roadmap(career):
    prompt = f"""
    You are an expert career counselor and senior tech educator.
    Create a practical, step-by-step learning roadmap for someone who wants to become a: {career}
    
    Return ONLY a raw JSON object with no markdown, no backticks, and no extra text.
    
    Structure:
    {{
        "steps": ["Step 1: [Topic] - [Brief detail]", "Step 2: [Topic] - [Brief detail]", "Step 3: [Topic] - [Brief detail]"],
        "resources": ["Recommended Resource 1", "Recommended Resource 2", "Recommended Resource 3"],
        "projects": ["Beginner Project Idea", "Advanced Project Idea"]
    }}
    """
    
    try:
        response_text = ask_ai(prompt)
        
        # Clean up the response
        clean_json = response_text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    
    except Exception as e:
        print("\n--- ERROR PARSING ROADMAP JSON ---")
        print(str(e))
        print("----------------------------------\n")
        
        return {
            "steps": ["Could not generate roadmap steps at this time."],
            "resources": ["N/A"],
            "projects": ["Please try again."]
        }