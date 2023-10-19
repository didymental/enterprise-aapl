from ..services.order_service import OrderService
import json
from flask import request
from sqlalchemy import inspect


def get_reporting_amount_by_hour_interval():
    start_time = request.form["startTime"]
    end_time = request.form["endTime"]

    filters = dict()
    if start_time:
        filters["start_time"] = start_time
    if end_time:
        filters["end_time"] = end_time

    order_service = OrderService()
    orders = order_service.get_orders(
        filters=filters,
        group_by=["ship_to_city_cd"],
        aggregation=("sum", "rptg_amt"),
    )
    results = []
    for order in orders:
        results.append(order._asdict())

    return results


def get_reporting_amount_by_city():
    # get reporting amount by city for all time
    # maybe add filter by time
    print(request.args)
    sort_order, sort_col = None, None
    if request.args and request.args["sortOrder"]:
        sort_order = request.args["sortOrder"]
    if request.args and request.args["sortCol"]:
        sort_col = request.args["sortCol"]
    order_service = OrderService()
    orders = order_service.get_orders(
        group_by=["ship_to_city_cd"],
        aggregation=("sum", "rptg_amt"),
        sort=(sort_col, sort_order) if sort_order and sort_col else None,
    )
    results = []
    for order in orders:
        results.append(order._asdict())

    return results


def get_running_order_qty_total_by_city():
    filters = dict()
    if request.form and request.form["city"]:
        filters["ship_to_city_cd"] = request.form["city"]

    order_service = OrderService()
    orders = order_service.get_orders(
        filters=filters,
        group_by=["ship_to_city_cd"],
        aggregation=("sum", "order_qty"),
    )
    results = []
    for order in orders:
        results.append(order._asdict())

    total_sum = sum(list(map(lambda x: x['sum_order_qty'], results)))

    return {"sum": total_sum, "data": results}
