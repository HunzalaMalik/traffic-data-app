# Traffic Data App

A full-stack web application built with a Rails backend and a React frontend to manage and analyze traffic data.

---

## Overview of System Architecture

The **Traffic Data App** follows a **microservices-like** architecture using **Docker** to containerize the backend, frontend, and database services. The application consists of:

- **Backend (Rails API)**: Manages business logic, authentication, and database interactions.
- **Frontend (React App)**: Provides an interactive user interface for managing traffic data.
- **Database (PostgreSQL)**: Stores and retrieves traffic data efficiently.
- **Docker & Docker Compose**: Used to containerize and orchestrate the services.

Each service runs in its own container, ensuring modularity and scalability.

---

## Prerequisites

### Backend
- **Ruby** [3.4.1](https://www.ruby-lang.org/en/news/2024/12/25/ruby-3-4-1-released/)
- **Rails** [8.0.1](https://guides.rubyonrails.org/8_0_release_notes.html)
- **PostgreSQL**

### Frontend
- **Node.js** [23.6](https://nodejs.org/en/)
- **npm** [10.9.2](https://docs.npmjs.com/)

---

## Setup and Execution Instructions

### Clone the Repository
```bash
git clone https://github.com/HunzalaMalik/traffic-data-app.git
cd traffic-data-app
```

### Install Docker Desktop (IMPORTANT!!)
Ensure you have **Docker Desktop** installed:
- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Install and start Docker Desktop

### Verify Docker is Running
Check if Docker is running with:
```bash
docker info
```
If this command returns details about Docker, it is running. If not, start Docker Desktop.

### Run the Setup Script
```bash
./setup.sh
```

This script will:
1. **Check if Docker is installed and running**
2. **Check and install Docker Compose if missing**
3. **Stop and remove any running containers**
4. **Create a Docker network (`traffic_network`)**
5. **Build and start backend, frontend, and database containers** using `docker-compose up -d --build`
6. **Verify running services** using `docker ps`
7. **Provide application access URLs**

### Access the Application
Once setup is complete, you can access:
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **Frontend App**: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

The Traffic Data App provides the following API endpoints:

### Base URL
```
http://localhost:3001/api/v1/
```

### **Country Traffic Endpoints**
| Method | Endpoint                     | Description                        |
|--------|------------------------------|------------------------------------|
| GET    | `/api/v1/country_traffics`   | Retrieve all country traffic data |
| POST   | `/api/v1/country_traffics`   | Create a new country traffic entry |
| GET    | `/api/v1/country_traffics/:id` | Retrieve a specific country traffic entry |
| PATCH  | `/api/v1/country_traffics/:id` | Update a country traffic entry |
| DELETE | `/api/v1/country_traffics/:id` | Delete a country traffic entry |

### **Vehicle Type Traffic Endpoints**
| Method | Endpoint                                                         | Description                         |
|--------|------------------------------------------------------------------|-------------------------------------|
| GET    | `/api/v1/country_traffics/:country_traffic_id/vehicle_type_traffics` | Retrieve all vehicle type traffic data for a country |
| POST   | `/api/v1/country_traffics/:country_traffic_id/vehicle_type_traffics` | Create a new vehicle type traffic entry |
| GET    | `/api/v1/country_traffics/:country_traffic_id/vehicle_type_traffics/:id` | Retrieve a specific vehicle type traffic entry |
| PATCH  | `/api/v1/country_traffics/:country_traffic_id/vehicle_type_traffics/:id` | Update a vehicle type traffic entry |
| DELETE | `/api/v1/country_traffics/:country_traffic_id/vehicle_type_traffics/:id` | Delete a vehicle type traffic entry |

---

## Development
- To stop the application:
  ```bash
  docker-compose down
  ```
- To restart the application after changes:
  ```bash
  docker-compose up -d --build
  ```

