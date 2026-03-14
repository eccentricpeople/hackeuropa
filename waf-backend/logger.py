import json

LOG_FILE = "logs.json"

def add_log(entry):
    with open(LOG_FILE, "r+") as f:
        logs = json.load(f)
        logs.append(entry)
        f.seek(0)
        json.dump(logs, f, indent=4)

def get_logs():
    with open(LOG_FILE, "r") as f:
        return json.load(f)
