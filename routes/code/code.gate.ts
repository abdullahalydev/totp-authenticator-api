// packages
import express from "express";
import mongoose from "mongoose";

// factories
import CodeFactory from "./code.factory";

export default class CodeGate {
	static async paramter(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const lockerId = request.params.lockerId as string;
		const codeId = request.params.codeId as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(codeId);
			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid code id format",
				});
				return;
			}

			const query = await CodeFactory.findOne(lockerId, codeId);
			if (!query) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "code not found",
				});
				return;
			}

			request.code = query;

			next();
		} catch (error) {
			next(error);
		}
	}

	static async payload(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const lockerId = request.params.lockerId as string;
		const codeId = request.params.codeId as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(codeId);
			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid code id format",
				});
				return;
			}

			const query = await CodeFactory.findOne(lockerId, codeId);
			if (!query) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "code not found",
				});
				return;
			}

			request.code = query;

			next();
		} catch (error) {
			next(error);
		}
	}

	static async query(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const lockerId = request.params.lockerId as string;
		const codeId = request.params.codeId as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(codeId);
			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid code id format",
				});
				return;
			}

			const query = await CodeFactory.findOne(lockerId, codeId);
			if (!query) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "code not found",
				});
				return;
			}

			request.code = query;

			next();
		} catch (error) {
			next(error);
		}
	}
}
