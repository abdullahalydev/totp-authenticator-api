// packages
import crypto from "crypto";
import mongoose from "mongoose";

// schemas
import UserSchema, { UserSchemaInterface } from "./user.schema";

export interface LockerSchemaInterface {
	_id: string;
	title: mongoose.Schema.Types.String;
	description: mongoose.Schema.Types.String;
	user: UserSchemaInterface;
	trash: mongoose.Schema.Types.Boolean;
	star: mongoose.Schema.Types.Boolean;
}

export const LockerSchemaModel = new mongoose.Schema<LockerSchemaInterface>(
	{
		title: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		description: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: UserSchema,
			required: true,
		},
		trash: {
			type: mongoose.Schema.Types.Boolean,
			required: false,
		},
		star: {
			type: mongoose.Schema.Types.Boolean,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("locker", LockerSchemaModel);
