from ..services.order_service import OrderService
import json


def get_reporting_amount_by_hour_interval():
    # maybe add for filtering by cities
    order_service = OrderService()
    results = order_service.get_orders(
        filters={"start_time": "050000", "end_time": "052000"},
        group_by=["ship_to_city_cd"],
        aggregation=("sum", "rptg_amt"),
    )
    print(results)
    return "Reporting Amount By Hour"


def get_reporting_amount_by_city():
    # get reporting amount by city for all time
    # maybe add filter by time
    return "Rptg amount by city"
