from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/farmers_network"
mongo = PyMongo(app)

@app.route('/')
def home():
    return "Welcome to Tanigather!"

@app.route('/api/weather', methods=['GET'])
def get_weather():
    weather_data = mongo.db.weather.find()
    output = [{'temperature': data['temperature'], 'description': data['description']} for data in weather_data]
    return jsonify(output)

@app.route('/api/weather', methods=['POST'])
def add_weather():
    temperature = request.json.get('temperature')
    description = request.json.get('description')
    mongo.db.weather.insert_one({'temperature': temperature, 'description': description})
    return jsonify({'message': 'Weather data added!'}), 201

if __name__ == '__main__':
    app.run(debug=True)