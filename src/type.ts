import mongoose from "mongoose";
import type { Context as BaseContext } from "elysia/dist";

/**
 * Extends the base Elysia Context with custom properties.
 */
export interface Context extends BaseContext {
	mongoose: typeof mongoose.connection | undefined;
}

/**
 * Represents a response data transfer object.
 */
export class ResponseDTO<T> {
	error?: unknown;
	message?: string;
	result?: T;
	status?: number;
	constructor(data?: Partial<ResponseDTO<T>>) {
		Object.assign(this, data);

		// Helper type guard
		const isObjectWithErrorProps = (
			obj: unknown
		): obj is Record<string, unknown> => {
			return typeof obj === "object" && obj !== null;
		};

		if (isObjectWithErrorProps(data?.error)) {
			// Use a temporary object to build the error details safely
			const errorDetails: Record<string, unknown> = {};

			if (typeof data.error.message === "string") {
				errorDetails.message = data.error.message;
			} else if (typeof data.error.code === "string") {
				errorDetails.message = data.error.code;
			} else if (typeof data.error.error === "string") {
				errorDetails.message = data.error.error;
			} else if (typeof data.error.name === "string") {
				errorDetails.message = data.error.name;
			}

			if (Bun.env.NODE_ENV !== "production") {
				if (typeof data.error.stack === "string") {
					errorDetails.stack = data.error.stack;
				}
				if (typeof data.error.trace === "string") {
					errorDetails.trace = data.error.trace;
				}
			}
			// Assign the collected details to this.error only if any were found
			if (Object.keys(errorDetails).length > 0) {
				this.error = errorDetails;
			}
		}
	}
}
