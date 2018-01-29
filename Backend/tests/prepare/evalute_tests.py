import unittest
import pandas as pd
from prepare import evaluate
CLASSIFICATION_PATH = "/Users/mikkeld/ai-for-analysts/Backend/datasets/regression/titanic/data/train.csv"


class TestClassification(unittest.TestCase):
    label_col = 'Churn'
    id_col = 'CustomerId'
    classification_dataset = pd.read_csv(CLASSIFICATION_PATH)
    problem_type = 'classification'
    url = 'https://firebasestorage.googleapis.com/v0/b/anasist-191616.appspot.com/o/uploads%2Fchurn_1517241617910csv.csv?alt=media&token=4b747ae5-3de8-4d7e-a23e-8a1cdc49375d'

    def test_classification(self):
        df = pd.read_csv(self.url)
        assessment = evaluate.evaluate_label_and_id(
            label_column=self.label_col,
            id_column=self.id_col,
            df=df,
            problem_type=self.problem_type)
        print(assessment)
        self.assertTrue(type(assessment) is dict,
                        "The assessment returned unexpected values")

    def test_headers(self):
        headers = evaluate.get_headers(self.url)
        print(headers)
        self.assertTrue(type(list(headers)) is list,
                        "The header did not return a list")


if __name__ == '__main__':
    unittest.main()

