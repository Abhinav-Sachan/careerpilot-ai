from services.ai_client import ask_ai_stream

def generate_interview_prep(role):
    prompt = f"""
    You are an expert technical interviewer and career coach.
    Generate interview preparation for the following target job role: {role}
    
    Do NOT use JSON. Format your response cleanly using these exact text headings:
    
    COMMON QUESTIONS:
    (List 3 common questions)
    
    SAMPLE ANSWERS:
    (Provide strong sample answers for the questions)
    
    PRO TIPS:
    (Crucial behavioral and technical tips)
    """
    
    return ask_ai_stream(prompt)