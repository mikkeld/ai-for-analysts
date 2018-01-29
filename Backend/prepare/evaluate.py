import numpy as np
import pandas as pd


CSV_FILE_TYPES = ['csv']
EXCEL_FILE_TYPES = ['xls, xlsx']
UNKNOWN_SONYNOMS = ["unknown", "n/a", "NaN", ""]


def get_headers(file_path):
    return pd.read_csv(file_path, nrows=1).columns


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
                          problem_type):
    """
    Assess if there are any issues with the labelled data column
    """
    output = {}
    output["n_rows"] = len(df)
    for col in [label_column, id_column]:
        df[col] = handle_nans(df[col])
    output["label_nan_share"] = df[label_column].isnull().sum() / len(df[label_column])
    output["id_nan_share"] = df[id_column].isnull().sum() / len(df[id_column])
    if problem_type == "classification":
        output["number_of_categories"] = len(df[label_column].dropna().unique())
    if problem_type == "regression":
        output["not_a_number_share"] = dtype_share(df[label_column], float)

    return [
        {
            "id": "id_nan_share",
            "theme": "ID",
            "summary": "Many N/A's in ID column",
            "details": "The ID column contains many unknowns. We can still train the model but it's worth looking at the data set",
            "stat": output["id_nan_share"],
            "status": "yellow",
            "include": str(output["id_nan_share"] > 1000)
        },
        {
            "id": "label_nan_share",
            "theme": "Target",
            "summary": "Many N/A's in target column",
            "details": "The Target column contains many unknowns. We can still train the model but it's worth looking at the data set",
            "stat": output["label_nan_share"],
            "status": "yellow",
            "include": str(output["label_nan_share"] > 0.1)
        },
        {
            "id": "number_of_categories",
            "theme": "Target",
            "summary": "Many classes in target column",
            "details": "Your target data column contains too many different classes. It might be hard to generalize",
            "stat": output["number_of_categories"],
            "status": "red",
            "include": str(output["number_of_categories"] > 100)
        }
    ]


if __name__ == '__main__':
    df = pd.read_csv('/Users/mikkeld/ai-for-analysts/Backend/datasets/regression/titanic/data/train.csv')
    label_col = 'Survived'
    id_col = 'PassengerId'
    problem_type = 'classification'
    res = evaluate_label_and_id(
        label_column=label_col,
        id_column=id_col,
        df=df,
        problem_type='classification')
    print(res)
