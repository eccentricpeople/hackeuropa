from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class RequestData(BaseModel):
    url: str
    headers: str
    body: str

@app.get("/")
def home():
    return {"message": "AI WAF running"}