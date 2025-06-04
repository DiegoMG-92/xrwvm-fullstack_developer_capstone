# Stage 1: Build React frontend
FROM node:18 AS frontend
WORKDIR /frontend
COPY client/ ./
RUN npm install && npm run build

# Stage 2: Django + Flask + Static Frontend
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y build-essential curl

WORKDIR /app

COPY server/ ./server/
COPY server/djangoapp/microservices/ ./microservices/

# ✅ Copy Vite build into Django static directory
COPY --from=frontend /frontend/dist ./server/client_build/

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

RUN python -m nltk.downloader vader_lexicon

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 8000
CMD ["./entrypoint.sh"]