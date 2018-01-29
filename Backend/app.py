from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from prepare import evaluate
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/headers', methods=['POST'])
@cross_origin()
def extract_headers():
    inputs = request.json
    print(inputs)
    headers = evaluate.get_headers(inputs['url'])
    print(headers)
    return jsonify({'headers': list(headers)})


@app.route('/api/prepare', methods=['POST'])
@cross_origin()
def prepare():
    inputs = request.json
    df = pd.read_csv(inputs["upload"]["url"])
    assessment = evaluate.evaluate_label_and_id(label_column=inputs["label"],
                                                id_column=inputs["id"],
                                                df=df,
                                                problem_type=inputs["problemType"])
    print(assessment)
    return jsonify({'assessment': assessment})


@app.route('/')
def main():
    print("App is running")


if __name__ == '__main__':
    app.run()