import os
import requests
import pymongo
from flask import Flask,request, send_from_directory, Response
from flask_cors import CORS

# Initialization of variables
appid = '011246a644cb2dfd17aff6aeaea183c4' # weather api API-Key
app = Flask(__name__, static_folder="public/weather_app/build")
mongo_client = pymongo.MongoClient("mongodb://root:web_appPassword@mongo:27017/")
user_db = mongo_client["users_db"]
users_col = user_db["users_col"]
CORS(app)


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Signup api
@app.route('/signup')
def signup():
    args = request.args
    user = args.get('user')
    pass_hash = args.get('hash')
    users_col.insert_one({"user": user, "hash": pass_hash})
    return Response("Signup successful", status=200)

# Login api
@app.route('/login')
def login():
    args = request.args
    user = args.get('user')
    pass_hash = args.get('hash')
    if(user == None or pass_hash == None):
        return Response("empty credentials", status=403)

    db_data = users_col.find_one({"user": user})
    if (db_data == None or db_data["user"] != user or db_data["hash"] != pass_hash):
        return Response("forbidden", status=403)
    return Response("Login successful", status=200)


# Retrieve data from weather api
@app.route('/weather')
def weather():
    city = request.args.get("city")
    response = requests.get("https://api.openweathermap.org/data/2.5/weather?q={}&appid={}".format(city, appid))
    res = response.json()
    return res



if __name__ == '__main__':
   app.run(host='0.0.0.0')