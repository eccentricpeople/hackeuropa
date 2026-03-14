import joblib

# Load the trained model and vectorizer
clf = joblib.load("waf_classifier.pkl")
vectorizer = joblib.load("waf_vectorizer.pkl")

# Labels
labels = ["Benign", "Malicious"]

def analyze_with_ml(text):
    
    # Convert text to features using vectorizer
    vec = vectorizer.transform([text])
    
    # Get prediction from classifier
    label = clf.predict(vec)[0]
    
    # Get confidence score
    confidence = clf.predict_proba(vec).max()
    
    # Return attack type and confidence
    attack_type = "Benign" if label == "BENIGN" else "Malicious"
    
    return attack_type, float(confidence)