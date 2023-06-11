import json

import requests

# Replace with your valid endpoint and prediction key
endpoint = "https://southcentralus.api.cognitive.microsoft.com/"
prediction_key = "71acb1feaadc4b8bb5fd2bd32d9bc908"

headers = {
    "Prediction-Key": prediction_key,
    "Content-Type": "application/octet-stream"
}

# Open an image file in binary mode
with open("/Users/edison/WebstormProjects/jamhacks-7/backend/erenaa copy.jpeg", "rb") as image_file:
    image_data = image_file.read()

response = requests.post(endpoint, headers=headers, data=image_data)

if response.status_code == 200:
    predictions = response.json()
    print(json.dumps(predictions, indent=4))
else:
    print(response.text)
    print(f"Request failed with status code {response.status_code}")

