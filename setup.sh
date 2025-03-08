#!/bin/bash

echo "🚀 Starting setup script..."

# Make the script executable
chmod +x setup.sh

# Set the backend and frontend directories
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# Environment variables
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_DB="traffic_data_app"
DOCKER_NETWORK="traffic_network"

# Define the endpoint URL
BACKEND_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"

# Ensure Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

echo "🐳 Setting up Docker network..."
docker network create $DOCKER_NETWORK || true

# Setup Backend
echo "🔧 Setting up the Rails backend..."
cd $BACKEND_DIR

# Copy the example environment file
cp .env.example .env || true

# Ensure dependencies are installed
bundle install

# Set up the database
echo "📦 Setting up the database..."
docker-compose up -d postgres
sleep 5 # Wait for PostgreSQL to start
rails db:create db:migrate db:seed

# Start the backend server
echo "🚀 Starting the backend server..."
docker-compose up -d backend

cd ..

# Setup Frontend
echo "🌐 Setting up the React frontend..."
cd $FRONTEND_DIR

# Ensure dependencies are installed
npm install

# Start the frontend server
echo "🚀 Starting the frontend server..."
docker-compose up -d frontend

cd ..

# Show the running services
echo "✅ Services are now running!"

echo "🔗 Access the application:"
echo "📌 Backend API: $BACKEND_URL"
echo "📌 Frontend App: $FRONTEND_URL"
