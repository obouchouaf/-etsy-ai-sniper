from openai import OpenAI
import os

client = OpenAI()

def analyze_competitors(listings):
    prompt = f"""You are an Etsy product analyst. Analyze the following listings and provide insights on what makes them successful (e.g. pricing, keywords, titles, images, etc.):

{listings}

Give a summary of common patterns and tips to compete with them."""
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert Etsy SEO analyst."},
            {"role": "user", "content": prompt}
        ]
    )

    reply = response.choices[0].message.content
    return reply
