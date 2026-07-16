import json
from services.ai_client import ask_ai

def analyze_resume(resume_text):
    prompt = f"""
    You are an expert career advisor and resume analyzer. 
    Analyze the following resume text. 
    Return ONLY a raw JSON object with no markdown, no backticks, and no extra text.
    
    Structure:
    {{
        "skills": ["List", "of", "all", "technical", "skills", "found"],
        "experience": "A concise, professional evaluation of the candidate's work experience.",
        "summary": "A 2-sentence professional summary.",
        "suggestions": ["Actionable improvement 1", "Actionable improvement 2", "Actionable improvement 3"]
    }}

    Resume text to analyze:
    {resume_text}
    """
    
    try:
        response_text = ask_ai(prompt)
        
        # We are printing this to the terminal to see what the AI is actually saying
        print("\n--- RAW AI RESPONSE ---")
        print(response_text)
        print("-----------------------\n")
        
        clean_json = response_text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    
    except Exception as e:
        # We are printing the exact error so we can fix it
        print("\n--- ERROR PARSING JSON ---")
        print(str(e))
        print("--------------------------\n")
        
        return {
            "skills": ["Analysis failed"],
            "experience": "N/A",
            "summary": "Could not process resume text.",
            "suggestions": ["Please ensure the resume contains clear text and try again."]
        }