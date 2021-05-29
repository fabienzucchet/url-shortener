from influxdb_client import InfluxDBClient, Point
from influxdb_client.client import write_api, query_api
import datetime
from .database import bucket
from ..common import RequestMetadata


def get_stats_url(q: query_api, _start: datetime.timedelta, _every: datetime.timedelta, url_id: int, bucket: str = bucket):
    p = {"_start": _start,
         "_url_id": str(url_id),
         "_desc": True,
         "_every": _every
         }

    query = '''
    from(bucket:"{}") |> range(start: _start)
    |> filter(fn: (r) => r["_measurement"] == "access_urls")
    |> filter(fn: (r) => r["_field"] == "access")
    |> filter(fn: (r) => r["url_id"] == _url_id)
    |> aggregateWindow(every: _every, fn: sum, createEmpty: true)
    |> cumulativeSum()
    |> sort(columns: ["_time"], desc: _desc)
    '''.format(bucket)

    tables = q.query(query, params=p)
    return tables


def new_access_url(w: write_api, url_id: int, username: str, metadata: RequestMetadata, bucket: str = bucket):
    _point = Point("access_urls") \
        .tag("user", username) \
        .tag("url_id", url_id) \
        .field("referer", metadata.referer) \
        .field("browser", metadata.browser) \
        .field("os", metadata.os) \
        .field("device", metadata.device) \
        .field("access", 1)
    w.write(bucket=bucket, record=[_point])
