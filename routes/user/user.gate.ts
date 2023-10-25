// packages
import express from "express";
import mongoose from "mongoose";

// factroies
import UserFactory from "./user.factory";

export default class UserGate {
	static async payload(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const userId = request.body.userId as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(userId);
			if (!validate) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "invalid id format",
				});
				return;
			}

			const user = UserFactory.findOne(userId);
			if (!user) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "user not found",
				});
				return;
			}

			next();
			return;
		} catch (error) {
			next(error);
		}
	}
	static async parameter(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const userId = request.params.userId as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(userId);
			if (!validate) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "invalid id format",
				});
				return;
			}

			const user = await UserFactory.findOne(userId);
			if (!user) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "user not found",
				});
				return;
			}

			next();
			return;
		} catch (error) {
			next(error);
		}
	}
	static async query(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const userId = request.query.userId as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(userId);
			if (!validate) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "invalid id format",
				});
				return;
			}

			const user = UserFactory.findOne(userId);
			if (!user) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "user not found",
				});
				return;
			}

			next();
			return;
		} catch (error) {
			next(error);
		}
	}
}
