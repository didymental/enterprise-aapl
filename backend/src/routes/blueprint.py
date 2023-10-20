from flask import Blueprint
from ..controllers.order_controller import get_reporting_amount_by_hour_interval, get_reporting_amount_by_city, get_running_order_qty_total_by_city, get_unique_cities
from ..controllers.ingestion_controller import ingest_excel_file


blueprint = Blueprint('blueprint', __name__)
blueprint.route('/reporting-amount/hour', methods=['GET'])(get_reporting_amount_by_hour_interval)
blueprint.route('/reporting-amount/city', methods=['GET'])(get_reporting_amount_by_city)
blueprint.route('/order-qty/city', methods=['POST', 'GET'])(get_running_order_qty_total_by_city)
blueprint.route('/ingestion', methods=['POST'])(ingest_excel_file)
blueprint.route('/city', methods=['GET'])(get_unique_cities)
