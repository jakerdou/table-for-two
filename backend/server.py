from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from random import randrange

app = Flask(__name__)
CORS(app)

num_total_rest = 80

@app.route('/get_restaurants')
def get_restaurants():
    num_sample_rest = 5
    rand_ints = []
    for i in range(num_sample_rest):
        rand_ints.append(randrange(num_total_rest))

    all_data = np.load('rest_filter.npy')

    sample_data = all_data[rand_ints]

    a = {'key': 'Hello, World!!'}
    return jsonify(sample_data.tolist())


@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    print(request.get_json()['sample_ratings'])
    return jsonify({'key': 'value'})
