from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
from enum import Enum

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

CSV_FILE_TYPES = ['csv']
EXCEL_FILE_TYPES = ['xls, xlsx']
UNKNOWN_SONYNOMS = ["unknown", "n/a", "NaN", ""]

LABEL_ASSESSMENT = {
    "nan_share": 0,
    "classification": {
        "number_of_categories": 0
    },
    "regression": {
        "not_a_number_share": 0
    }
}

ID_ASSESSMENT = {
    "nan_share": 0
}


class ProblemTypes(Enum):
    BINARY_CLASSIFICATION = 1
    MULTI_LABEL_CLASSIFICATION = 2
    REGRESSION = 3
    CLASSIFICATION = 4
    UNKNOWN = 5


def get_headers(file_path):
    return pd.read_csv(file_path, nrows=1).columns
    #elif file_path in EXCEL_FILE_TYPES:
    #    workbook = pd.ExcelFile(file_path)
    #    rows = workbook.book.sheet_by_index(0).nrows
    #    return pd.read_excel(workbook, skip_footer=(rows - 1))
    #else:
    #    return False


def handle_nans(iterable):
    return [np.nan if str(i).lower().strip() in UNKNOWN_SONYNOMS else i for i in iterable]


def dtype_share(iterable, dtype, threshold=0.9):
    success_count = 0
    for i in iterable:
        try:
            dtype(i)
        except ValueError:
            pass
        else:
            success_count += 1
    return success_count / len(iterable)


def evaluate_label_and_id(label_column, id_column, df,
                          problem_type, label_assessment, id_assessment):
    """
    Assess if there are any issues with the labelled data column
    """
    for col in [label_column, id_column]:
        df[col] = handle_nans(df[col])
    label_assessment["nan_share"] = df[label_column].isnull().sum() / len(df[label_column])
    id_assessment["nan_share"] = df[id_column].isnull().sum() / len(df[id_column])
    if problem_type == "classification":
        label_assessment[problem_type]["number_of_categories"] = len(df[label_column].dropna().unique())
    if problem_type == "regression":
        label_assessment[problem_type]["not_a_number_share"] = dtype_share(df[label_column], float)
    return {
        "label": label_assessment,
        "id": id_assessment
    }


@app.route('/api/headers', methods=['POST'])
@cross_origin()
def extract_headers():
    inputs = request.json
    headers = get_headers(inputs['url'])
    print(headers)
    return jsonify({'headers': list(headers)})


@app.route('/api/prepare', methods=['POST'])
@cross_origin()
def prepare():
    inputs = request.json
    print(inputs)
    df = pd.read_csv(inputs["upload"]["url"])
    assessment = evaluate_label_and_id(label_column=inputs["label"],
                                       id_column=inputs["id"],
                                       df=df,
                                       problem_type=inputs["problemType"],
                                       label_assessment=LABEL_ASSESSMENT,
                                       id_assessment=ID_ASSESSMENT)
    print(assessment)
    return jsonify(assessment)


@app.route('/')
def main():
    print("App is running")


if __name__ == '__main__':
    app.run()