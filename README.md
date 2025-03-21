# Boilerplate REST API using Bun

This repository contains a professional boilerplate for building a REST API using the [Bun](https://bun.sh/) runtime,
an alternative to Node.js designed to be faster and more efficient. The project is structured using `Elysia`,
a minimalist web framework for Bun, and `mongoose` for MongoDB object modeling.

## Overview

This project provides a complete, production-ready REST API that manages authors and their blog posts. It demonstrates:

- Modern REST API architecture with TypeScript
- MongoDB integration with Mongoose
- Clean project structure with separation of concerns
- Robust error handling and response standardization

Suitable for both learning purposes and as a foundation for production applications.

## Features

- **Bun Runtime**: Ultra-fast JavaScript runtime as an alternative to Node.js
- **Elysia Framework**: Lightweight and fast web framework for handling HTTP requests
- **MongoDB Integration**: Complete setup with Mongoose models for authors and posts
- **Docker Support**: Ready-to-use Docker Compose setup for MongoDB and Mongo Express
- **TypeScript**: Full TypeScript support for better developer experience
- **Error Handling**: Built-in middleware for error handling and response standardization
- **Environment Variables**: Configured to use environment variables for easy configuration
- **Helper Scripts**: Includes a convenient script for managing the API and MongoDB
- **Detailed Guide**: Comprehensive guide for running and testing the API

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) runtime (v1.0.0 or newer)
  - Installation: `curl -fsSL https://bun.sh/install | bash`
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for MongoDB)
  - Follow the official Docker installation guide for your operating system
- [curl](https://curl.se/) or [Postman](https://www.postman.com/) for testing API endpoints (optional)

## Quick Start

### Step 1: Clone the repository

```sh
git clone https://github.com/aashari/boilerplate-rest-api-bun.git
cd boilerplate-rest-api-bun
```

### Step 2: Set up environment variables

```sh
# Copy the example environment file
cp .env.example .env
```

Note: The default values in .env should work out of the box for local development.

### Step 3: Start MongoDB using Docker Compose

```sh
# Start MongoDB and Mongo Express
./api.sh mongo-up

# You can access Mongo Express at http://localhost:8081
```

Note: Mongo Express is a web-based MongoDB admin interface that lets you view and modify your database.

### Step 4: Install dependencies

```sh
bun install
```

### Step 5: Start the development server

```sh
# Start the API in the background
./api.sh start

# Check the logs
./api.sh logs
```

The server will start at http://localhost:3000 by default.

Note: If you want to see the server logs in real-time, press `Ctrl+C` to exit the logs view while keeping the server running.

## Using the Helper Script

This project includes a helper script (`api.sh`) to make it easier to manage the API and MongoDB:

```sh
# Show available commands
./api.sh help

# Start the API
./api.sh start

# Check if the API is running
./api.sh status

# View API logs
./api.sh logs

# Stop the API
./api.sh stop

# Start MongoDB containers
./api.sh mongo-up

# Stop MongoDB containers
./api.sh mongo-down
```

## API Endpoints

### Posts

- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `GET /posts/:id` - Get a post by ID
- `PUT /posts/:id` - Update a post by ID
- `DELETE /posts/:id` - Delete a post by ID

### Authors

- `GET /authors` - Get all authors
- `POST /authors` - Create a new author
- `GET /authors/:id` - Get an author by ID
- `PUT /authors/:id` - Update an author by ID
- `DELETE /authors/:id` - Delete an author by ID

### Root

- `GET /` - Returns a simple "hello world" message

## Project Structure

```
.
├── src/
│   ├── _mongo/              # MongoDB connection and models
│   │   ├── index.ts         # MongoDB connection setup
│   │   ├── model.author.ts  # Author model
│   │   └── model.post.ts    # Post model
│   ├── authors/             # Author-related components
│   │   ├── dto.ts           # Author Data Transfer Object
│   │   ├── index.ts         # Author routes
│   │   └── service.ts       # Author service functions
│   ├── posts/               # Post-related components
│   │   ├── dto.ts           # Post Data Transfer Object
│   │   ├── index.ts         # Post routes
│   │   └── service.ts       # Post service functions
│   ├── index.ts             # Main application entry point
│   └── type.ts              # Common types and interfaces
├── .env.example             # Example environment variables
├── api.sh                   # Helper script for managing the API
├── docker-compose.yml       # Docker Compose configuration
├── GUIDE.md                 # Comprehensive guide for running and testing
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## Architecture Overview

### Key Components

1. **Entry Point (`src/index.ts`)**

   - Sets up the Elysia server
   - Registers middleware for logging and error handling
   - Registers routes for authors and posts
   - Connects to MongoDB

2. **MongoDB Connection (`src/_mongo/index.ts`)**

   - Establishes a connection to MongoDB
   - Configures connection options based on environment variables

3. **Models (`src/_mongo/model.author.ts` and `src/_mongo/model.post.ts`)**

   - Define the schema for authors and posts
   - Create indexes for optimized queries
   - Establish relationships between models

4. **Routes and Controllers**

   - Each resource (authors, posts) has its own module with routes and service functions
   - Routes define the API endpoints
   - Service functions implement the business logic

5. **Data Transfer Objects (DTOs)**
   - Handle data transformations between the API and the database
   - Ensure data consistency and validation

## Development

### Running in Development Mode

```sh
bun run dev
```

This will start the server with hot reloading enabled, which means changes to your code will automatically restart the server.

### Environment Variables

The following environment variables can be configured in the `.env` file:

- `PORT`: The port on which the server will run (default: 3000)
- `SERVER_NAME`: The name of the server (default: boilerplate-rest-api-bun)
- `MONGODB_URI`: The MongoDB connection URI (default: mongodb://localhost:27017)
- `MONGODB_DATABASE`: The MongoDB database name (default: boilerplate_db)
- `NODE_ENV`: The environment mode (development, production, etc.)

## MongoDB Management

This project includes [Mongo Express](https://github.com/mongo-express/mongo-express), a web-based MongoDB admin interface. When you start the Docker Compose setup, you can access Mongo Express at http://localhost:8081.

You can use Mongo Express to:

- Browse and query collections
- View, add, delete, and update documents
- Create and delete indexes
- Execute MongoDB commands

## Troubleshooting

### MongoDB Connection Issues

- Ensure Docker is running
- Check if the MongoDB container is running with `docker ps`
- Verify that the MongoDB URI in your `.env` file is correct
- Try restarting the MongoDB container with `./api.sh mongo-down` followed by `./api.sh mongo-up`

### API Startup Issues

- Check the logs with `./api.sh logs` or `cat app.log`
- Verify Bun is installed correctly
- Ensure all dependencies are installed with `bun install`
- Verify that nothing else is running on the configured port (default: 3000)

### Authentication Issues with MongoDB

- If using authentication, ensure the username and password in `.env` match those in `docker-compose.yml`
- If not using authentication, comment out or remove `MONGODB_USER` and `MONGODB_PASSWORD` from `.env`

## Additional Documentation

For a comprehensive guide on running and testing the API, see the [GUIDE.md](GUIDE.md) file. This guide includes:

- Detailed setup instructions
- Example API calls with `curl`
- Troubleshooting tips
- Next steps for enhancing the project

## License

Distributed under the MIT License. See `LICENSE` for more information.
