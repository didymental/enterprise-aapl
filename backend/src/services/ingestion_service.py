import pandas as pd
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..utils.constants import DB_FILE_PATH, EXCEL_FILE_PATH
from ..models.base import Base
from ..models.order import Order

class IngestionService:
    def __init__(self):
        self.engine = create_engine(f'sqlite:///{DB_FILE_PATH}')
        self.Session = sessionmaker(bind=self.engine)

    def ingest_excel_file(self, excel_file_path):
        df = pd.read_excel(EXCEL_FILE_PATH, engine="openpyxl")
        column_mapping = {
            "Unique ordernumber": "order_id",
            "ORDER_TIME  (PST)": "order_time",
            "SHIP_TO_DISTRICT_NAME": "ship_to_district_name",
            "SHIP_TO_CITY_CD": "ship_to_city_cd",
            "RPTG_AMT": "rptg_amt",
            "CURRENCY_CD": "currency_cd",
            "ORDER_QTY": "order_qty",
        }
        df.rename(columns=column_mapping, inplace=True)
        df['order_time'] = df['order_time'].map(lambda val: datetime.strptime(str(val), '%H%M%S'))
        session = self.Session()

        # Create the table based on the model
        Base.metadata.drop_all(bind=self.engine)
        Base.metadata.create_all(bind=self.engine)

        # insert data into table
        for index, row in df.iterrows():
            order_data = dict()
            for column_name, cell_value in row.items():
                order_data[column_name] = cell_value

            new_order = Order(**order_data)
            session.add(new_order)
            
        session.commit()
        session.close()
