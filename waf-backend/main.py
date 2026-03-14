from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ml_model import analyze_with_ml
from logger import add_log, get_logs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RequestData(BaseModel):
    url: str
    headers: str
    body: str


@app.get("/")
def home():
    return {"message": "AI WAF running"}


@app.post("/analyze")
def analyze(data: RequestData):

    text = data.url + " " + data.headers + " " + data.body

    attack_type, confidence = analyze_with_ml(text)

    result = {
        "attack_type": attack_type,
        "confidence": confidence,
        "blocked": attack_type != "Benign"
    }

    add_log({
        "url": data.url,
        "headers": data.headers,
        "body": data.body,
        "attack_type": attack_type,
        "confidence": confidence,
        "blocked": attack_type != "Benign"
    })

    return result


@app.get("/logs")
def logs():
    return get_logs()
