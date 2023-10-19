from dotenv import load_dotenv
import os

load_dotenv()

EXCEL_FILE_PATH = os.getenv("EXCEL_FILE_PATH")
DB_FILE_PATH = os.getenv("DB_FILE_PATH")
