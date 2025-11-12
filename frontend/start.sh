#!/bin/bash

# Saral Mitti Frontend Startup Script

echo "Starting Saral Mitti Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cp .env.local.example .env.local
fi

# Start development server
echo "Starting Next.js development server..."
npm run dev
