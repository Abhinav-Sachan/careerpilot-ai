from services.ai_client import ask_ai_stream

def generate_learning_roadmap(career):
    prompt = f"""
    You are an expert career counselor and senior tech educator.
    Create a practical, step-by-step learning roadmap for someone who wants to become a: {career}
    
    Do NOT use JSON. Format your response cleanly using these exact text headings:
    
    STEPS:
    (List the step-by-step process)
    
    RESOURCES:
    (Recommend specific tools, courses, or books)
    
    PROJECTS TO BUILD:
    (Suggest beginner and advanced projects)
    """
    
    return ask_ai_stream(prompt)