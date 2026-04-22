import cohere
from app.core.config import COHERE_API_KEY

client = cohere.ClientV2(api_key=COHERE_API_KEY)

def generate_sql(prompt: str):
    try:
        response = client.chat(
            model="command-r-08-2024",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        if not response or not response.message.content:
            print("No response or empty response from model.")
            return "Could not generate response"
        print("SQL Generation Response:", response)
        return response.message.content[0].text
    except Exception as e:
        print(f"Error generating SQL: {e}")
        return "Could not generate response"

def generate_text(prompt: str):
    try:
        response = client.chat(
            model="command-r-08-2024",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        if not response or not response.message.content:
            print("No response or empty response from model.")
            return "Could not generate response"
        print("Text Generation Response:", response)
        return response.message.content[0].text.strip()
    except Exception as e:
        print(f"Error generating text: {e}")
        return "Could not generate response"