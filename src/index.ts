import { Elysia, NotFoundError } from "elysia";
import { mongoRegister } from "./_mongo";
// import { ResponseDTO } from "./type"; // Remove unused import

import posts from "./posts";
import authors from "./authors";

/**
 * Default middleware function for the Elysia application.
 * This middleware sets the "x-request-time" header on the request and logs the HTTP request details.
 * It also handles errors and returns a ResponseDTO with the appropriate status code and error message.
 *
 * @param app - The Elysia application instance.
 * @returns The modified Elysia application instance.
 */
function defaultMiddleware(app: Elysia) {
	app.onRequest((ctx) => {
		const parsedURL = new URL(ctx.request.url);
		ctx.request.headers.set("x-request-time", Date.now().toString());
		console.log(
			`[index.ts] 🦊 Got HTTP request on ${ctx.request.method.toUpperCase()} ${parsedURL.pathname}`
		);
		return;
	});

	app.onError((ctx) => {
		const parsedURL = new URL(ctx.request.url);

		// Type guard to check if error has a numeric status property
		const hasStatus = (
			error: unknown
		): error is { status: number } & Record<string, unknown> => {
			return (
				typeof error === "object" &&
				error !== null &&
				"status" in error &&
				typeof (error as { status: unknown }).status === "number"
			);
		};

		const status = hasStatus(ctx.error)
			? ctx.error.status
			: ctx.error instanceof NotFoundError
				? 404
				: 500;

		console.log(
			`[index.ts] 😨 Got HTTP error ${status} on ${ctx.request.method.toUpperCase()} ${parsedURL.pathname} => [${ctx.error}]`
		);
		return { status: status, error: ctx.error };
	});

	return app;
}

/**
 * The main application instance.
 */
const app = new Elysia()
	.use(mongoRegister)
	.use(defaultMiddleware)
	.use(posts)
	.use(authors)
	.get(`/`, () => ({ status: 200, message: `🤖 🇮🇩 hello world!` }))
	.listen(Bun.env.PORT || 3000);

console.log(
	`[index.ts] 🦊 successfully started Elysia server on ${app.server?.hostname}:${app.server?.port}`
);
