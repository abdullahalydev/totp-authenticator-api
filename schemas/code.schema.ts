// packages
import crypto from "crypto";
import mongoose from "mongoose";

// schemas
import LockerSchema, { LockerSchemaInterface } from "./locker.schema";

export interface CodeSchemaInterface {
	_id: string;
	title: string;
	secret: string;
	encoding: "ascii" | "hex" | "base32" | "base64";
	step: number;
	digits: number;
	locker: LockerSchemaInterface;
	trash: boolean;
	star: boolean;
}

export const CodeSchemaModel = new mongoose.Schema<CodeSchemaInterface>(
	{
		title: {
			type: String,
			required: true,
		},
		secret: {
			type: String,
			required: true,
		},
		encoding: {
			type: String,
			required: true,
		},
		step: {
			type: Number,
			required: true,
		},
		digits: {
			type: Number,
			required: true,
		},
		locker: {
			type: mongoose.Schema.Types.ObjectId,
			ref: LockerSchema,
			required: true,
		},
		trash: {
			type: Boolean,
			required: false,
			default :false
		},
		star: {
			type: Boolean,
			required: false,
			default:true
		},
	},
	{ timestamps: true }
);

export default mongoose.model("code", CodeSchemaModel);
