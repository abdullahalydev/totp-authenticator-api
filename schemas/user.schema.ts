// packages
import mongoose from "mongoose";

export interface UserSchemaInterface {
	_id: string;
	fname: string;
	lname: string;
	email: string;
	roles?: string[];
	password: string;
}

export const UserSchemaModel = new mongoose.Schema<UserSchemaInterface>(
	{
		fname: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		lname: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		email: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true,
		},
		roles: {
			type: [mongoose.Schema.Types.String],
			required: false,
			default: new Array(),
		},
		password: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("user", UserSchemaModel);
