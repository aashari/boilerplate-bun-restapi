import { Model, Types, Schema, model, Document } from "mongoose";

/**
 * Represents an author in the database.
 */
export interface IAuthor extends Document {
	_id?: Types.ObjectId;
	username: string;
	created_at?: Date;
	updated_at?: Date;
}

/**
 * Represents the schema for an author in the database.
 */
const SchemaAuthor = new Schema<IAuthor>({
	username: {
		type: String,
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
 * Represents the Author model.
 */
export const Author: Model<IAuthor> = model<IAuthor>("author", SchemaAuthor);

/**
 * Indexing part.
 */
Author.collection.createIndex({ username: 1 }, { unique: true });
