from sqlalchemy import create_engine, select, func, text
from sqlalchemy.orm import sessionmaker
from ..models.order import Order
from ..utils.constants import DB_FILE_PATH
from datetime import datetime
from sqlalchemy.sql import func


class OrderService:
    def __init__(self):
        self.engine = create_engine(f"sqlite:///{DB_FILE_PATH}")
        self.Session = sessionmaker(bind=self.engine)

    def group_orders_by_hour(self, filters=dict()):
        session = self.Session()

        # Parse start_time and end_time as datetime objects
        start_time = datetime.strptime(filters["start_time"], "%H%M%S")
        end_time = datetime.strptime(filters["end_time"], "%H%M%S")

        # Define the select statement
        sql_query = text(
            """
                SELECT STRFTIME('%H', order_time) AS hour, COUNT(*) AS count
                FROM order_table
                WHERE order_time BETWEEN :start_time AND :end_time
                GROUP BY hour
                ORDER BY hour
            """
        )

        results = session.execute(
            sql_query, {"start_time": start_time, "end_time": end_time}
        ).fetchall()
        session.close()
        return results

    def get_orders(self, filters=dict(), group_by=None, aggregation=None, sort=None):
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

            if "ship_to_city_cd" in filters:
                cities = filters["ship_to_city_cd"]
                query = query.filter(Order.ship_to_city_cd.in_(cities))

            if group_by:
                group_by_columns = [getattr(Order, col) for col in group_by]
                query = query.group_by(*group_by_columns)

            if aggregation:
                group_by_columns = (
                    [getattr(Order, col) for col in group_by]
                    if "hour" not in group_by
                    else []
                )
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

            if sort:
                sort_col, sort_order = sort
                orders = sorted(
                    orders,
                    key=lambda x: getattr(x, sort_col),
                    reverse=sort_order == "desc",
                )

            return orders

        finally:
            session.close()
