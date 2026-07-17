from services.ai_client import ask_ai_stream

def analyze_resume(resume_text):
    prompt = f"""
    You are an expert career advisor and resume analyzer. 
    Analyze the following resume text. 
    
    Do NOT use JSON. Format your response cleanly using these exact text headings:
    
    SKILLS:
    (List technical skills here)
    
    EXPERIENCE:
    (Evaluate the candidate's work experience)
    
    SUMMARY:
    (A 2-sentence professional summary)
    
    SUGGESTIONS:
    (Actionable improvements)

    Resume text to analyze:
    {resume_text}
    """
    
    # We now return the streaming generator directly
    return ask_ai_stream(prompt)