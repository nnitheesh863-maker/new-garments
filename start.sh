#!/bin/bash

echo "Starting Garment Production System..."
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "Warning: MongoDB is not running. Starting MongoDB..."
    mongod --dbpath ./data/db &
    sleep 3
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Start the application
echo "Starting the application..."
cd ..
echo ""
echo "Backend will start on port 5000"
echo "Frontend will start on port 3000"
echo ""
echo "Access the application at: http://localhost:3000"
echo ""
echo "Starting services..."

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!

# Start frontend
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "Services started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop all services"

# Trap to kill processes on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait
