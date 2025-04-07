import Elysia from "elysia";

import {
	authorsCreateData,
	authorsDeleteDataById,
	authorsGetDataById,
	authorsGetDataList,
	authorsUpdateDataById,
} from "./service";

/**
 * Represents the REST API endpoint for authors.
 * @returns {Elysia} The Elysia instance for the authors endpoint.
 */
export default new Elysia({ prefix: `/authors` })
	.get(`/`, authorsGetDataList)
	.post(`/`, authorsCreateData)
	.get(`/:id`, authorsGetDataById)
	.put(`/:id`, authorsUpdateDataById)
	.delete(`/:id`, authorsDeleteDataById);
