Task Manager Application
This is a dynamic web application for managing tasks, built as part of the Web Programming 2025 course. It includes static HTML mockups and a basic server setup for Part 1 and Part 2 of the project requirements.
Features

Login/Registration: Static pages for user authentication.
Task Management: Pages for listing, adding, editing, and deleting tasks.
Search: A page for searching tasks by title or description.
External Integration: Displays weather information for task locations (mockup).
Responsive Design: Custom CSS (styles.css) ensures compatibility across desktop, tablet, and mobile devices.

Prerequisites

Docker and Docker Compose installed.
Node.js (for local development without Docker).
MongoDB (local or cloud-based, e.g., MongoDB Atlas).

Setup Instructions
Running Locally with Docker

Clone the repository:git clone <repository-url>
cd task-manager-app


Start the application and MongoDB using Docker Compose:docker-compose up --build


Access the application at http://localhost:3000.

Running Locally without Docker

Navigate to the server directory and install dependencies:cd server
npm install


Start the server:node index.js


Access the application at http://localhost:3000.

Notes

The application serves static HTML files from the public directory, styled with styles.css.
Ensure MongoDB is running locally or configure a MongoDB Atlas connection for production.
The application has been tested in Chrome, Firefox, and Safari.

Project Status

Part 1: Completed static HTML mockups for all required screens, styled with custom CSS.
Part 2: Basic server setup with Express and Docker configuration for local development.
Parts 3 and 4: To be implemented (REST API, MongoDB integration, and React SPA).

Deployment
The application can be deployed to a cloud platform like Heroku or Render. Update the docker-compose.yml and environment variables for production use with MongoDB Atlas.
