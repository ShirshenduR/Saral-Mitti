#!/bin/bash

# Saral Mitti Backend Startup Script

echo "Starting Saral Mitti Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Create media directory if it doesn't exist
mkdir -p media/uploads

# Start server
echo "Starting Django development server..."
python manage.py runserver
