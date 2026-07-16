import json
from services.ai_client import ask_ai

def generate_interview_prep(role):
    prompt = f"""
    You are an expert technical interviewer and career coach.
    Generate interview preparation for the following target job role: {role}
    
    Return ONLY a raw JSON object with no markdown, no backticks, and no extra text.
    
    Structure:
    {{
        "questions": ["Common Question 1", "Common Question 2", "Common Question 3"],
        "answers": ["Strong Sample Answer 1", "Strong Sample Answer 2", "Strong Sample Answer 3"],
        "tips": ["Crucial tip on what interviewers look for", "Behavioral tip", "Technical tip"]
    }}
    """
    
    try:
        response_text = ask_ai(prompt)
        
        # Clean up the response just like we did for the resume
        clean_json = response_text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    
    except Exception as e:
        print("\n--- ERROR PARSING INTERVIEW JSON ---")
        print(str(e))
        print("------------------------------------\n")
        
        return {
            "questions": ["Could not generate questions at this time."],
            "answers": ["N/A"],
            "tips": ["Please try again."]
        }