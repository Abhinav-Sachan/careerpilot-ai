import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Groq-compatible client
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def ask_ai_stream(prompt):
    try:
        # Added stream=True to enable real-time token delivery
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a professional career coach. Provide structured, concise, and helpful responses."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            stream=True, 
        )
        
        # Yield each chunk of text exactly when it arrives
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content
                
    except Exception as e:
        yield f"Error connecting to AI: {str(e)}"