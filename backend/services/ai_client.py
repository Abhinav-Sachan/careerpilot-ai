import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Groq-compatible client
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def ask_ai(prompt):
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a professional career coach. Provide structured, concise, and helpful responses."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error connecting to AI: {str(e)}"

if __name__ == "__main__":
    print(ask_ai("Say hello in one sentence"))