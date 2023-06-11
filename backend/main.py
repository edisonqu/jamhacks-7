from flask import Flask, jsonify
from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os

app = Flask(__name__)

# cuid, display name, firebaseId, hasShowered, Datetime, totalShowers, probabilityScore
uri = f"mongodb+srv://{os.getenv('MONGODB_USERNAME')}:{os.getenv('MONGODB_PASSWORD')}@cluster0.igg4cmw.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

db = client.jamhacks

@app.route('/verify', methods=['POST'])
def verification():
    # post request that has the firebaseId, display name
    # create a table
    # handle the bytes to post
    # call the azure api
    # handle probability

    return 'Hello, World!'

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    collection = db['showers']  # replace with your collection name
    pipeline = [
        {"$match": {"has_showered": True}},
        {"$group": {
            "_id": "$firebase_id",
            "shower_count": {"$sum": 1}
        }},
        {"$lookup": {
            "from": "showers",  # replace with your collection name
            "localField": "_id",
            "foreignField": "firebase_id",
            "as": "user_info"
        }},
        {"$unwind": "$user_info"},
        {"$project": {
            "_id": 0,
            "display_name": "$user_info.display_name",
            "shower_count": 1
        }}
    ]

    results = list(collection.aggregate(pipeline))
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
