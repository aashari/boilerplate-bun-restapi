import Elysia from "elysia";
import mongoose from "mongoose";

/**
 * The connection object for the MongoDB database.
 */
let connection: typeof mongoose.connection | undefined = undefined;

/**
 * Retrieves the MongoDB connection.
 * If a connection already exists, it returns the existing connection.
 * Otherwise, it establishes a new connection using the provided connection string and database name.
 *
 * @returns {Promise<mongoose.connection | undefined>} The MongoDB connection or undefined if the connection fails.
 */
export async function mongoGetConnection() {
	if (connection) return connection;

	// Get MongoDB configuration from environment variables
	const connectionString = Bun.env.MONGODB_URI || "mongodb://localhost:27017";
	const connectionDatabase = Bun.env.MONGODB_DATABASE || "test";
	const username = Bun.env.MONGODB_USER;
	const password = Bun.env.MONGODB_PASSWORD;

	// Build connection options
	const connectionOptions: mongoose.ConnectOptions = {
		appName: Bun.env.SERVER_NAME || "boilerplate-rest-api-bun",
		dbName: connectionDatabase,
	};

	// Add authentication if username and password are provided
	if (username && password) {
		connectionOptions.auth = {
			username,
			password,
		};
	}

	console.log(
		`[mongo.ts] 🦊 attempting to connect to MongoDB at ${connectionString}/${connectionDatabase}`
	);

	connection = await mongoose
		.connect(connectionString, connectionOptions)
		.then((response) => {
			console.log(`[mongo.ts] 🦊 successfully connected to MongoDB`);
			return response.connection;
		})
		.catch((error) => {
			console.error(
				`[mongo.ts] 😨 failed to connect to MongoDB: ${error}`
			);
			return undefined;
		});

	return connection;
}

/**
 * Registers the MongoDB connection to the app state.
 * @param app - The Elysia app instance.
 * @returns The updated app instance with the MongoDB connection stored in the app state.
 */
export async function mongoRegister(app: Elysia) {
	// we store the connection to the app state
	app.state("mongoose", await mongoGetConnection());
	return app;
}
