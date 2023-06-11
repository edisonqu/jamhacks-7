from base64 import b64decode

from flask import Flask, jsonify
from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os
from flask import request
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

# cuid, display name, firebaseId, hasShowered, Datetime, totalShowers, probabilityScore
uri = f"mongodb+srv://jammy:jamhacks!@cluster0.igg4cmw.mongodb.net/"
client = MongoClient(uri)

db = client.jamhacks

@app.route('/verify', methods=['POST'])
def verification():
    data = request.get_json()  # get data from POST request
    firebase_id = data.get('firebaseId')
    display_name = data.get('displayName')

    # Create a record in MongoDB
    collection = db['showers']  # replace with your collection name
    # doc_id = collection.insert_one({
    #     "firebase_id": firebase_id,
    #     "display_name": display_name,
    #     "has_showered": False,  # or some other initial value
    #     "probability_score": 0,  # or some other initial value
    #     "time": datetime.utcnow()
    # }).inserted_id

    # Handle the byte data from POST request
    # This depends on what you're doing with the byte data
    byte_data_base64 = data.get('byteData')
    byte_data_bytes = b64decode(byte_data_base64)

    # Call the Azure API
    # This depends on the specific Azure API you're using
    azure_api_url = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/69c85dff-8308-43b3-942d-676be4d462fb/classify/iterations/Iteration1/image'  # replace with the actual Azure API URL
    prediction_key = "71acb1feaadc4b8bb5fd2bd32d9bc908"

    headers = {
        "Prediction-Key": prediction_key,
        "Content-Type": "application/octet-stream"
    }

    azure_api_response = requests.post(azure_api_url, headers=headers,data=byte_data_bytes)
    azure_api_response_data = azure_api_response.json()

    print(azure_api_response_data)

    # Handle probability
    # This depends on how you're handling the probability
    probability = azure_api_response_data.get('probability')

    # Update the document in MongoDB with the probability
    # collection.update_one({"_id": doc_id}, {"$set": {"probability_score": probability}})

    return {"message": "Verification processed", "probability": probability}


@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    collection = db['showers']  # replace with your collection name
    pipeline = [
        {"$match": {"has_showered": True}},
        {"$group": {
            "_id": "$display_name",
            "shower_count": {"$sum": 1}
        }},
        {"$project": {
            "_id": 0,
            "display_name": "$_id",
            "shower_count": 1
        }}
    ]

    results = list(collection.aggregate(pipeline))
    return jsonify(results)


@app.route('/showers/<firebase_id>', methods=['GET'])
def get_showers(firebase_id):
    collection = db['showers']  # replace with your collection name
    results = collection.find({"firebase_id": firebase_id, "has_showered": True}, {"time": 1, "_id": 0})
    dates = [result['time'] for result in results]
    return jsonify(dates)


if __name__ == "__main__":
    app.run(debug=True)
