// packages
import express from "express";

// schemas
import { UserSchemaInterface } from "../schemas/user.schema";
import { LockerSchemaInterface } from "../schemas/locker.schema";
import { CodeSchemaInterface } from "../schemas/code.schema";

declare global {
	namespace Express {
		export interface Request {
			user: UserSchemaInterface;
			locker: LockerSchemaInterface;
			code: CodeSchemaInterface;
		}
	}
}

declare module "express-session" {
	export interface SessionData {
		initialized?: boolean;
		user?: string;
	}
}
