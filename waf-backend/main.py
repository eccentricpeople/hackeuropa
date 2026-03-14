from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# request structure
class RequestData(BaseModel):
    url: str
    headers: str
    body: str


@app.get("/")
def home():
    return {"message": "AI WAF running"}


# analyze endpoint
@app.post("/analyze")
def analyze(data: RequestData):

    text = data.url + " " + data.headers + " " + data.body

    attack_type, confidence = analyze_with_ml(text)

    return {
        "attack_type": attack_type,
        "confidence": confidence,
        "blocked": attack_type != "Benign"
    }
from ml_model import analyze_with_ml