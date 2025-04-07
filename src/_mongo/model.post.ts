import { Model, Types, Schema, model, Document } from "mongoose";
import { IAuthor, Author } from "./model.author";

/**
 * Represents a post in the database.
 */
export interface IPost extends Document {
	_id?: Types.ObjectId;
	title: string;
	content: string;
	author: IAuthor | Types.ObjectId;
	created_at?: Date;
	updated_at?: Date;
}

/**
 * Represents the schema for a post in the database.
 */
const SchemaPost = new Schema<IPost>({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: Author.modelName,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
	updated_at: {
		type: Date,
	},
});

/**
 * Represents the Post model.
 */
export const Post: Model<IPost> = model<IPost>("post", SchemaPost);

/**
 * Indexing part.
 */
Post.collection.createIndex({ title: "text", content: "text" });
Post.collection.createIndex({ author: 1 });
