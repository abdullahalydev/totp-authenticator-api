// packages
import express from "express";
import mongoose from "mongoose";

// factories
import LockerFactory from "./locker.factory";

export default class LockerGate {
	static async paramter(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// parameters
		const lockerId = request.params.lockerId as string;

		// gates
		const user = request.user;

		try {
			const validate = mongoose.Types.ObjectId.isValid(lockerId);
			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid locker id format",
				});
				return;
			}

			const query = await LockerFactory.findOne(user._id, lockerId);
			if (!query) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "locker not found",
				});
				return;
			}

			request.locker = query;

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
		// payload
		const lockerId = request.body.lockerId as string;

		// gates
		const user = request.user;

		try {
			const validate = mongoose.Types.ObjectId.isValid(lockerId);
			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid locker id format",
				});
				return;
			}

			const query = await LockerFactory.findOne(user._id, lockerId);
			if (!query) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "locker not found",
				});
				return;
			}

			request.locker = query;

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
		// queries
		const lockerId = request.query.lockerId as string;

		// gates
		const user = request.user;

		try {
			const validate = mongoose.Types.ObjectId.isValid(lockerId);
			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid locker id format",
				});
				return;
			}

			const query = await LockerFactory.findOne(user._id, lockerId);
			if (!query) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "locker not found",
				});
				return;
			}

			request.locker = query;

			next();
		} catch (error) {
			next(error);
		}
	}
}
