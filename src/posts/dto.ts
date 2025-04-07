import { Types, isValidObjectId } from "mongoose";
import { AuthorDTO } from "../authors/dto";

/**
 * Represents a Data Transfer Object for a post.
 */
export class PostDTO {
	/**
	 * The _id of the post.
	 */
	public _id?: string | Types.ObjectId;

	/**
	 * The title of the post.
	 */
	public title?: string;

	/**
	 * The content of the post.
	 */
	public content?: string;

	/**
	 * The author of the post.
	 */
	public author?: AuthorDTO | Types.ObjectId;

	/**
	 * The date and time when the post was created.
	 */
	public created_at?: Date;

	/**
	 * The date and time when the post was last updated.
	 */
	public updated_at?: Date;

	/**
	 * Creates an instance of PostDTO.
	 * @param data - Optional data to initialize the properties of the PostDTO.
	 */
	constructor(data?: Partial<PostDTO>) {
		if (data?._id) {
			this._id = `${data._id}`;
		}
		if (data?.title) {
			this.title = data.title;
		}
		if (data?.content) {
			this.content = data.content;
		}
		// if the author type is ObjectId then set this.author = {_id: author}
		// otherwise if it is contains _id then set this.author = author
		if (data?.author) {
			if (isValidObjectId(data.author)) {
				this.author = new AuthorDTO({
					_id: new Types.ObjectId(data.author as Types.ObjectId),
				});
			} else if (data.author._id) {
				this.author = new AuthorDTO(data.author);
			}
		}
		if (data?.created_at) {
			this.created_at = data.created_at;
		}
		if (data?.updated_at) {
			this.updated_at = data.updated_at;
		}
	}
}
