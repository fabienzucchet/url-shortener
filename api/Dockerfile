# Dockerfile to create a development image of the API

FROM python:3.9

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

# --reload : we assume that the code is mounted in a volume in the container to allow auto-reload of the server on save (dev mode)
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--workers", "1", "--port", "8000"]