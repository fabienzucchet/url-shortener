from influxdb_client import InfluxDBClient, Point, Dialect
from influxdb_client.client.write_api import SYNCHRONOUS
import datetime

bucket = "urlshortener"

client = InfluxDBClient(url="http://host.docker.internal:8086",
                        token="aaaa", org="viarezo")

write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()
