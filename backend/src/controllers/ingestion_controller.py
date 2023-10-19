from ..services.ingestion_service import IngestionService
from ..utils.constants import EXCEL_FILE_PATH


def ingest_excel_file():
    ingestion_service = IngestionService()
    ingestion_service.ingest_excel_file(EXCEL_FILE_PATH)
    return "ok"
