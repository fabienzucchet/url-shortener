from prometheus_client import Counter

EXAMPLE = Counter('example', 'example', ['method', 'endpoint', 'hostname'])
