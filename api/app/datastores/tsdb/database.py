import os

from influxdb_client import InfluxDBClient, Point, Dialect
from influxdb_client.client.write_api import SYNCHRONOUS
import datetime

bucket = os.getenv("INFLUX_BUCKET", "urlshortener")
influx_url = os.getenv("INFLUX_URL", "http://host.docker.internal:8086")
influx_token = os.getenv("INFLUX_TOKEN", "aaaa")
influx_org = os.getenv("INFLUX_ORG", "viarezo")

client = InfluxDBClient(url=influx_url, token=influx_token, org=influx_org)

write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()
