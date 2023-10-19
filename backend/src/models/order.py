from .base import Base
from sqlalchemy import Column, String, DateTime, Integer


class Order(Base):
    __tablename__ = "order_table"
    order_id = Column(String, primary_key=True)
    order_time = Column(DateTime)
    ship_to_district_name = Column(String)
    ship_to_city_cd = Column(String)
    rptg_amt = Column(String)
    currency_cd = Column(String)
    order_qty = Column(Integer)

    def to_dict(self):
        return {
            "order_id": self.order_id,
            "order_time": self.order_time.strftime("%H:%M:%S"),
            "ship_to_district_name": self.ship_to_district_name,
            "ship_to_city_cd": self.ship_to_city_cd,
            "rptg_amt": self.rptg_amt,
            "currency_cd": self.currency_cd,
            "order_qty": self.order_qty,
        }
