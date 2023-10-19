import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

# Load environment variables from .env file
load_dotenv()

EXCEL_FILE_PATH = os.getenv('EXCEL_FILE_PATH')
DB_FILE_PATH = os.getenv('DB_FILE_PATH')

print(f'reading excel file, {EXCEL_FILE_PATH}')
df = pd.read_excel(EXCEL_FILE_PATH, engine='openpyxl')
# format of timestamp is in HHMMSS 
df['ORDER_TIME  (PST)'] = pd.to_datetime(df['ORDER_TIME  (PST)'], format='%H%M%S', errors='coerce').dt.strftime('%H:%M:%S')

# Create a SQLAlchemy engine and connect to the SQLite database
engine = create_engine(f'sqlite:///{DB_FILE_PATH}')

# Store the DataFrame in the SQLite database
print(f'Storing excel into SQLite database')
df.to_sql('order_table', engine, if_exists='replace', index=False)

print(f"Excel data from '{EXCEL_FILE_PATH}' has been successfully imported into the SQLite database '{DB_FILE_PATH}'.")
