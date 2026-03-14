def analyze_with_ml(text):

    if "<script>" in text.lower():
        return "XSS", 0.92

    if "union select" in text.lower():
        return "SQL Injection", 0.90

    if "cmd=" in text.lower():
        return "Command Injection", 0.85

    return "Benign", 0.75