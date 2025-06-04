#!/bin/bash

echo "Running database migrations..."
python server/manage.py migrate

echo "Collecting static files..."
python server/manage.py collectstatic --noinput

echo "Starting Flask microservice..."
python microservices/app.py &

echo "Starting Django server..."
python server/manage.py runserver 0.0.0.0:8000