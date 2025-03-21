# Comprehensive Guide: Running and Testing the REST API

This guide provides detailed instructions for deploying and testing the REST API built with Bun and MongoDB. It is designed to help you understand the implementation and proper usage of the API endpoints.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up the Project](#setting-up-the-project)
3. [Running the API](#running-the-api)
4. [Testing the API with curl](#testing-the-api-with-curl)
5. [Stopping the API and Cleaning Up](#stopping-the-api-and-cleaning-up)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

## Prerequisites

Before proceeding, ensure you have the following installed:

- [Bun](https://bun.sh/) - JavaScript runtime
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) - For running MongoDB
- [curl](https://curl.se/) - For testing the API endpoints

## Setting Up the Project

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

The default configuration in `.env` is designed to work with the provided Docker Compose setup:

```
# Server Configuration
PORT=3000
SERVER_NAME=boilerplate-rest-api-bun

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=boilerplate_db

# Environment
NODE_ENV=development
```

### Step 3: Start MongoDB using Docker Compose

```sh
docker-compose up -d
```

This command starts MongoDB and Mongo Express in detached mode. Mongo Express, accessible at http://localhost:8081, provides a web-based interface for MongoDB database management.

### Step 4: Install dependencies

```sh
bun install
```

## Running the API

### Option 1: Using nohup (recommended for production-like environments)

```sh
# Start the API in the background and redirect output to app.log
nohup bun run dev > app.log 2>&1 &

# Check the logs to verify the API is running
tail -f app.log
```

You should see output similar to:

```
$ bun run --watch src/index.ts
[mongo.ts] 🦊 attempting to connect to MongoDB at mongodb://localhost:27017/boilerplate_db
[index.ts] 🦊 successfully started Elysia server on localhost:3000
[mongo.ts] 🦊 successfully connected to MongoDB
```

Press `Ctrl+C` to stop watching the logs (this won't stop the API).

### Option 2: Using the helper script

```sh
# Start the API in the background
./api.sh start

# Check the logs
./api.sh logs
```

### Option 3: Using a separate terminal (recommended for development)

```sh
# Start the API in the foreground
bun run dev
```

## Testing the API with curl

The following sections demonstrate how to interact with the API endpoints using curl commands.

### 1. Test the root endpoint

```sh
curl -X GET http://localhost:3000/
```

Expected response:

```json
{ "status": 200, "message": "🤖 🇮🇩 hello world!" }
```

### 2. Working with Authors

#### Create a new author

```sh
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe"}'
```

Expected response:

```json
{
  "status": 200,
  "result": {
    "username": "johndoe",
    "created_at": "2025-03-01T03:08:39.568Z",
    "_id": "67c27a6efbe6324cba9634a7",
    "__v": 0
  }
}
```

Note: Save the `_id` value for subsequent operations.

#### Get all authors

```sh
curl -X GET http://localhost:3000/authors
```

#### Get a specific author by ID

```sh
curl -X GET http://localhost:3000/authors/YOUR_AUTHOR_ID
```

Replace `YOUR_AUTHOR_ID` with the `_id` from the create author response.

#### Update an author

```sh
curl -X PUT http://localhost:3000/authors/YOUR_AUTHOR_ID \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe_updated"}'
```

### 3. Working with Posts

#### Create a new post

```sh
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post",
    "author": "YOUR_AUTHOR_ID"
  }'
```

Replace `YOUR_AUTHOR_ID` with the `_id` from the create author response.

#### Get all posts

```sh
curl -X GET http://localhost:3000/posts
```

#### Get a specific post by ID

```sh
curl -X GET http://localhost:3000/posts/YOUR_POST_ID
```

Replace `YOUR_POST_ID` with the `_id` from the create post response.

#### Update a post

```sh
curl -X PUT http://localhost:3000/posts/YOUR_POST_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Post Title",
    "content": "This is the updated content of my first post"
  }'
```

#### Delete a post

```sh
curl -X DELETE http://localhost:3000/posts/YOUR_POST_ID
```

#### Delete an author

```sh
curl -X DELETE http://localhost:3000/authors/YOUR_AUTHOR_ID
```

## Stopping the API and Cleaning Up

### Step 1: Stop the API

If you used the helper script:

```sh
./api.sh stop
```

If you used nohup:

```sh
# Find the process ID
ps aux | grep "bun run dev"

# Kill the process
kill YOUR_PROCESS_ID
```

Alternatively:

```sh
pkill -f "bun run dev"
```

### Step 2: Stop and remove Docker containers

```sh
docker-compose down
```

To also remove the volumes (this will delete all data in MongoDB):

```sh
docker-compose down -v
```

## Troubleshooting

### MongoDB Connection Issues

If you encounter authentication errors or connection refusals:

1. Verify MongoDB container status:

   ```sh
   docker ps
   ```

2. Check your `.env` file MongoDB URI:

   ```
   MONGODB_URI=mongodb://localhost:27017
   ```

3. Restart the MongoDB container:
   ```sh
   docker-compose restart mongodb
   ```

### API Startup Issues

If the API fails to start:

1. Check the logs:

   ```sh
   tail -f app.log
   ```

2. Verify all dependencies are installed:

   ```sh
   bun install
   ```

3. Ensure the port is available:
   ```sh
   lsof -i :3000
   ```

### curl Command Issues

If curl commands are not working:

1. Verify the API is running:

   ```sh
   curl http://localhost:3000/
   ```

2. Check for syntax errors in your commands, especially in IDs and JSON formatting.

3. Ensure you're using the correct HTTP method (GET, POST, PUT, DELETE).

## Next Steps

After successfully setting up and testing the REST API, consider these next steps:

1. **Extend the API**:

   - Add additional endpoints or models
   - Implement authentication and authorization
   - Add data validation

2. **Improve Performance**:

   - Implement caching
   - Optimize database queries
   - Add pagination for list endpoints

3. **Deploy to Production**:

   - Set up CI/CD pipelines
   - Configure production environment variables
   - Implement monitoring and logging

4. **Add Frontend**:
   - Create a frontend application that consumes the API
   - Implement real-time updates with WebSockets
   - Build a comprehensive admin dashboard

For additional resources and information about the technologies used, refer to:

- [Bun Documentation](https://bun.sh/docs)
- [Elysia Documentation](https://elysiajs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
