from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..models.order import Order
from ..utils.constants import DB_FILE_PATH
from datetime import datetime
from sqlalchemy.sql import func


class OrderService:
    def __init__(self):
        self.engine = create_engine(f"sqlite:///{DB_FILE_PATH}")
        self.Session = sessionmaker(bind=self.engine)

    def get_orders(self, filters=dict(), group_by=None, aggregation=None):
        session = self.Session()
        try:
            query = session.query(Order)
            if "order_id" in filters:
                query = query.filter(Order.order_id == filters["order_id"])

            if "start_time" in filters and "end_time" in filters:
                start_time = datetime.strptime(filters["start_time"], "%H%M%S")
                end_time = datetime.strptime(filters["end_time"], "%H%M%S")
                query = query.filter(
                    Order.order_time >= start_time, Order.order_time < end_time
                )

            if group_by:
                group_by_columns = [getattr(Order, col) for col in group_by]
                query = query.group_by(*group_by_columns)

            if aggregation:
                group_by_columns = [getattr(Order, col) for col in group_by]
                aggr, aggr_col = aggregation
                aggregation_columns = []
                if aggr == "sum":
                    aggregation_columns.append(
                        func.sum(getattr(Order, aggr_col)).label(f"sum_{aggr_col}")
                    )

                # Add more aggregation options as needed
                
                query = query.with_entities(*group_by_columns, *aggregation_columns)

            # Retrieve the orders that match the filters
            orders = query.all()
            return orders

        finally:
            session.close()
