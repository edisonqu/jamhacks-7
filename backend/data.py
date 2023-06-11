from pymongo.mongo_client import MongoClient
import os
from datetime import datetime
import dotenv

dotenv.load_dotenv()

uri = f"mongodb+srv://jammy:jamhacks!@cluster0.igg4cmw.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)
db = client.jamhacks

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")

    # cuid, display name, firebaseId, hasShowered, Datetime, totalShowers, probabilityScore

    shower = {
        'firebase_id':'DfkUBfemCNc56uMoexMotR7Iz1',
        'display_name': "Stephen Ni",
        'time': datetime.now(),
        'has_showered': True,
        'probability_score':0.9
    }
    ###
    # _id
    # 6485979
    # df0e0e565d005ef39
    # firebase_id
    # "kfFDUB14JmCNc23uMfewxMotR7Iz1"
    # display_name
    # "Anna Wei"
    # time
    # 2023 - 06 - 11
    # T05: 45:01.359 + 00: 00
    # probability_score
    # 0.8
    # has_showered
    # true
    ###

    result = db.showers.insert_one(shower)

    print(f"Inserted shower with ID {result.inserted_id}")
except Exception as e:
    print(e)