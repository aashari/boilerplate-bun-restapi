import { Post } from "../_mongo/model.post";
import { Context } from "../type";
import { PostDTO } from "./dto";

/**
 * Retrieves a list of all posts along with their associated authors from the database.
 *
 * @returns A ResponseDTO object with a 200 status code and a list of posts on success,
 *          or with a 500 status code and an error message in case of a failure.
 *          Each post includes details like title, content, author, creation, and update times.
 */
export async function postsGetDataList() {
	try {
		console.log(`[posts/service.ts@postsGetDataList] 🦊 start`);
		const posts = await Post.find()
			.populate("author")
			.catch((error) => {
				console.log(
					`[posts/service.ts@postsGetDataList] 😨 got error when find: ${error}`
				);
				throw error;
			});
		const normalizedPosts = posts.map((post) => new PostDTO(post.toJSON()));
		return { status: 200, result: normalizedPosts };
	} catch (error) {
		console.log(
			`[posts/service.ts@postsGetDataList] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Creates a new post in the database using the data provided in the request body.
 *
 * @param ctx - The context object, which includes the request body containing post details.
 *         Expected body format: { title: string, content: string, author: ObjectId }
 * @returns A ResponseDTO object with a 200 status code and the created post details on success,
 *          or with a 500 status code and an error message in case of a failure.
 */
export async function postsCreateData(
	ctx: Context & { body: Partial<PostDTO> }
) {
	try {
		const { body } = ctx;
		const requestBody = new PostDTO(body);
		const post = new Post(requestBody);
		await post.save();
		return { status: 200, result: post };
	} catch (error) {
		console.log(
			`[posts/service.ts@postsCreateData] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Retrieves a specific post by its ID, along with the author's details.
 *
 * @param ctx - The context object, which includes the post's ID in the URL parameters.
 * @returns A ResponseDTO object with a 200 status code and the requested post's details on success,
 *          a 404 status code and an error message if the post is not found,
 *          or a 500 status code and an error message in case of other failures.
 */
export async function postsGetDataById(ctx: Context) {
	try {
		const { id } = ctx.params;
		const post = await Post.findById(id)
			.populate("author")
			.catch((error) => {
				console.log(
					`[posts/service.ts@postsGetDataById] 😨 got error when find: ${error}`
				);
				throw error;
			});
		if (!post) {
			return { status: 404, error: `Post with id ${id} not found` };
		}
		const normalizedPost = new PostDTO(post.toJSON());
		return { status: 200, result: normalizedPost };
	} catch (error) {
		console.log(
			`[posts/service.ts@postsGetDataById] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Updates a post identified by its ID with the data provided in the request body.
 *
 * @param ctx - The context object, which includes the post's ID in URL parameters
 *         and the new post data in the request body.
 *         Expected body format: { title?: string, content?: string, author?: ObjectId }
 * @returns A ResponseDTO object with a 200 status code and the updated post details on success,
 *          a 404 status code and an error message if the post is not found,
 *          or a 500 status code and an error message in case of other failures.
 */
export async function postsUpdateDataById(
	ctx: Context & { params: { id: string }; body: Partial<PostDTO> }
) {
	try {
		const { id } = ctx.params;
		const { body } = ctx;
		const requestBody = new PostDTO(body);
		const post = await Post.findByIdAndUpdate(id, requestBody, {
			new: true,
		})
			.populate("author")
			.catch((error) => {
				console.log(
					`[posts/service.ts@postsUpdateDataById] 😨 got error when find: ${error}`
				);
				throw error;
			});
		if (!post) {
			return { status: 404, error: `Post with id ${id} not found` };
		}
		const normalizedPost = new PostDTO(post.toJSON());
		return { status: 200, result: normalizedPost };
	} catch (error) {
		console.log(
			`[posts/service.ts@postsUpdateDataById] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}

/**
 * Deletes a post identified by its ID from the database.
 *
 * @param ctx - The context object, which includes the post's ID in the URL parameters.
 * @returns A ResponseDTO object with a 200 status code and a confirmation of deletion on success,
 *          a 404 status code and an error message if the post is not found,
 *          or a 500 status code and an error message in case of other failures.
 */
export async function postsDeleteDataById(ctx: Context) {
	try {
		const { id } = ctx.params;
		const post = await Post.findByIdAndDelete(id)
			.populate("author")
			.catch((error) => {
				console.log(
					`[posts/service.ts@postsDeleteDataById] 😨 got error when find: ${error}`
				);
				throw error;
			});
		if (!post) {
			return { status: 404, error: `Post with id ${id} not found` };
		}
		return { status: 200, result: true };
	} catch (error) {
		console.log(
			`[posts/service.ts@postsDeleteDataById] 😨 got error: ${error}`
		);
		return { status: 500, error: error };
	}
}
