import Elysia from "elysia";

import {
	postsCreateData,
	postsDeleteDataById,
	postsGetDataById,
	postsGetDataList,
	postsUpdateDataById,
} from "./service";

/**
 * Represents the REST API endpoint for posts.
 * @returns {Elysia} The Elysia instance for the posts endpoint.
 */
export default new Elysia({ prefix: `/posts` })
	.get(`/`, postsGetDataList)
	.post(`/`, postsCreateData)
	.get(`/:id`, postsGetDataById)
	.put(`/:id`, postsUpdateDataById)
	.delete(`/:id`, postsDeleteDataById);
