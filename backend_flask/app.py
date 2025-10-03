import os
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # load variables from .env

app = Flask(__name__)

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.get_default_database()

@app.route('/')
def home():
    return "Connected to MongoDB!"

if __name__ == '__main__':
    app.run(debug=True)
