# waf_demo.py
import joblib

# Load the trained model and vectorizer
clf = joblib.load("waf_classifier.pkl")
vectorizer = joblib.load("waf_vectorizer.pkl")

# Prediction function
def predict_request_block(request_text):
    vec = vectorizer.transform([request_text])
    label = clf.predict(vec)[0]
    return "BENIGN" if label == "BENIGN" else "MALICIOUS"

# Test requests
test_requests = [
    "GET /home none",
    "POST /search?q=shoes",
    "GET /login?user=admin' OR '1'='1",
    "POST /comment?text=<script>alert('xss')</script>",
    "GET /products?id=123",
    "POST /login?username=admin&password=' OR ''='"
]

# Run demo
print("----- WAF Demo -----")
for req in test_requests:
    print(req, "->", predict_request_block(req))
