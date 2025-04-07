import { Author } from "../_mongo/model.author";
import { Context } from "../type";
import { AuthorDTO } from "./dto";

/**
 * Retrieves a list of all authors from the database.
 *
 * @returns A ResponseDTO object with a 200 status code and a list of authors on success,
 *          or with a 500 status code and an error message in case of a failure.
 */
export async function authorsGetDataList() {
	try {
		console.log(`[authors/service.ts@authorsGetDataList] 🦊 start`);
		const authors = await Author.find().catch((error) => {
			console.log(
				`[authors/service.ts@authorsGetDataList] 😨 got error when find: ${error}`
			);
			throw error;
		});
		const normalizedAuthors = authors.map(
			(author) => new AuthorDTO(author.toJSON())
		);
		return { status: 200, result: normalizedAuthors };
	} catch (error) {
		console.log(
			`[authors/service.ts@authorsGetDataList] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Creates a new author in the database using the data provided in the request body.
 *
 * @param ctx - The context object, which includes the request body containing author details.
 *         Expected body format: { username: string }
 * @returns A ResponseDTO object with a 200 status code and the created author details on success,
 *          or with a 500 status code and an error message in case of a failure.
 */
export async function authorsCreateData(
	ctx: Context & { body: Partial<AuthorDTO> }
) {
	try {
		const { body } = ctx;
		const requestBody = new AuthorDTO(body);
		const author = new Author(requestBody);
		await author.save();
		return { status: 200, result: author };
	} catch (error) {
		console.log(
			`[authors/service.ts@authorsCreateData] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Retrieves a specific author by its ID.
 *
 * @param ctx - The context object, which includes the author's ID in the URL parameters.
 * @returns A ResponseDTO object with a 200 status code and the requested author's details on success,
 *          a 404 status code and an error message if the author is not found,
 *          or a 500 status code and an error message in case of other failures.
 */
export async function authorsGetDataById(ctx: Context) {
	try {
		const { id } = ctx.params;
		const author = await Author.findById(id).catch((error) => {
			console.log(
				`[authors/service.ts@authorsGetDataById] 😨 got error when find: ${error}`
			);
			throw error;
		});
		if (!author) {
			return { status: 404, error: `Author with id ${id} not found` };
		}
		const normalizedAuthor = new AuthorDTO(author.toJSON());
		return { status: 200, result: normalizedAuthor };
	} catch (error) {
		console.log(
			`[authors/service.ts@authorsGetDataById] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Updates an author identified by its ID with the data provided in the request body.
 *
 * @param ctx - The context object, which includes the author's ID in URL parameters
 *         and the new author data in the request body.
 *         Expected body format: { username?: string }
 * @returns A ResponseDTO object with a 200 status code and the updated author details on success,
 *          a 404 status code and an error message if the author is not found,
 *          or a 500 status code and an error message in case of other failures.
 */
export async function authorsUpdateDataById(
	ctx: Context & { params: { id: string }; body: Partial<AuthorDTO> }
) {
	try {
		const { id } = ctx.params;
		const { body } = ctx;
		const requestBody = new AuthorDTO(body);
		const author = await Author.findByIdAndUpdate(id, requestBody, {
			new: true,
		}).catch((error) => {
			console.log(
				`[authors/service.ts@authorsUpdateDataById] 😨 got error when find: ${error}`
			);
			throw error;
		});
		if (!author) {
			return { status: 404, error: `Author with id ${id} not found` };
		}
		const normalizedAuthor = new AuthorDTO(author.toJSON());
		return { status: 200, result: normalizedAuthor };
	} catch (error) {
		console.log(
			`[authors/service.ts@authorsUpdateDataById] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Deletes an author identified by its ID from the database.
 *
 * @param ctx - The context object, which includes the author's ID in the URL parameters.
 * @returns A ResponseDTO object with a 200 status code and a confirmation of deletion on success,
 *          a 404 status code and an error message if the author is not found,
 *          or a 500 status code and an error message in case of other failures.
 */
export async function authorsDeleteDataById(ctx: Context) {
	try {
		const { id } = ctx.params;
		const author = await Author.findByIdAndDelete(id).catch((error) => {
			console.log(
				`[authors/service.ts@authorsDeleteDataById] 😨 got error when find: ${error}`
			);
			throw error;
		});
		if (!author) {
			return { status: 404, error: `Author with id ${id} not found` };
		}
		return { status: 200, result: true };
	} catch (error) {
		console.log(
			`[authors/service.ts@authorsDeleteDataById] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}
