echo "🚀 Starting setup script..."

chmod +x setup.sh

BACKEND_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"

echo "🛑 Stopping any existing running containers..."
docker-compose down -v || true

if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed. Please install Docker and try again."
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is installed but not running. Please start Docker and try again."
  exit 1
fi

if ! command -v docker-compose &> /dev/null; then
  echo "⚠️ Docker Compose is not installed. Installing..."
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  echo "✅ Docker Compose installed successfully."
fi

echo "🐳 Setting up Docker network..."
docker network create $DOCKER_NETWORK || true

echo "🐳 Building and starting services..."
docker-compose up --build -d

echo "✅ Services are now running!"

echo "🔗 Access the application:"
echo "📌 Backend API: $BACKEND_URL"
echo "📌 Frontend App: $FRONTEND_URL"