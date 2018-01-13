import numpy as np
import pandas as pd

CSV_FILE_TYPES = ['csv']
EXCEL_FILE_TYPES = ['xls, xlsx']


def get_headers(file_path):
    if file_path in CSV_FILE_TYPES:
        return pd.read_csv(file_path, nrows=1).columns
    elif file_path in EXCEL_FILE_TYPES:
        workbook = pd.ExcelFile(file_path)
        rows = workbook.book.sheet_by_index(0).nrows
        return pd.read_excel(workbook, skip_footer=(rows - 1))
    else:
        return False


