import { Types } from "mongoose";

/**
 * Represents a Data Transfer Object for a author.
 */
export class AuthorDTO {
	/**
	 * The _id of the author.
	 */
	public _id?: string | Types.ObjectId;

	/**
	 * The username of the author.
	 */
	public username?: string;

	/**
	 * The date and time when the author was created.
	 */
	public created_at?: Date;

	/**
	 * The date and time when the author was last updated.
	 */
	public updated_at?: Date;

	/**
	 * Creates an instance of AuthorDTO.
	 * @param data - Optional data to initialize the properties of the AuthorDTO.
	 */
	constructor(data?: Partial<AuthorDTO>) {
		if (data?._id) {
			this._id = `${data._id}`;
		}
		if (data?.username) {
			this.username = data.username;
		}
		if (data?.created_at) {
			this.created_at = data.created_at;
		}
		if (data?.updated_at) {
			this.updated_at = data.updated_at;
		}
	}
}
