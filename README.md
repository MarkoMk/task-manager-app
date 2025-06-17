# Task Manager Application

This is a dynamic web application for managing tasks, built as part of the Web Programming 2025 course. It includes a React SPA, REST API, and MongoDB integration for Parts 1–4 of the project requirements.

## Features
- **Login/Registration**: React components and API endpoints for user authentication.
- **Task Management**: Dynamic task listing, adding, editing, and deleting via React and API.
- **Search**: Search tasks by title or description in the React frontend.
- **External Integration**: Weather information for task locations via OpenWeatherMap API.
- **Responsive Design**: Custom CSS (`styles.css`) ensures compatibility across devices.

## Prerequisites
- Docker and Docker Compose installed.
- Node.js (for local development without Docker).
- MongoDB (local via Docker or MongoDB Atlas).
- OpenWeatherMap API key (sign up at https://openweathermap.org).

## Setup Instructions

### Environment Variables
Create a `.env` file in the `server` directory with:
```env
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_openweathermap_api_key

Running Locally with Docker





Clone the repository:

git clone <repository-url>
cd task-manager-app



Start the application and MongoDB using Docker Compose:

docker-compose up --build



Access the application at http://localhost:3000.

Running Locally without Docker





Navigate to the server directory and install dependencies:

cd server
npm install



Start MongoDB locally or use MongoDB Atlas.



Start the server:

node index.js



Access the application at http://localhost:3000.

API Endpoints





Users:





POST /api/users/register: Register a user (username, email, password).



POST /api/users/login: Login a user (email, password).



Tasks (requires Bearer token in Authorization header):





GET /api/tasks: Get all tasks for the user.



GET /api/tasks/:id: Get a task by ID with weather data.



POST /api/tasks: Create a task (title, description, dueDate).



PUT /api/tasks/:id: Update a task.



DELETE /api/tasks/:id: Delete a task.

Notes





The React SPA is served from the client directory, styled with styles.css.



The REST API is secured with JWT authentication.



Weather data is fetched from OpenWeatherMap for tasks (e.g., Skopje).



The application has been tested in Chrome, Firefox, and Safari.

Project Status





Part 1: Completed static HTML mockups (replaced by React).



Part 2: Server setup with Express and Docker.



Part 3: REST API with MongoDB and JWT authentication.



Part 4: React SPA with API integration completed.

Deployment

Deploy to a cloud platform like Heroku or Render. Use MongoDB Atlas for production and set environment variables in docker-compose.yml or the platform’s settings.