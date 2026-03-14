from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load pretrained transformer model
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=4
)

# labels for prediction
labels = ["Benign", "SQL Injection", "XSS", "Command Injection"]


def analyze_with_ml(text):
    
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True
    )

    outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)

    confidence, predicted_class = torch.max(probs, dim=1)

    attack_type = labels[predicted_class.item()]

    return attack_type, confidence.item()