import os 
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
import re
from time import sleep

load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("APi key bot found")

client = Groq(api_key = my_api_key)

model = "openai/gpt-oss-120b" 