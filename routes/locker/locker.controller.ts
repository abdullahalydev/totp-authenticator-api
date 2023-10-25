// packages
import express from "express";

// factories
import LockerFactory from "./locker.factory";

export default class LockerController {
	static async findMany(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const user = request.user;

		try {
			const query = await LockerFactory.findMany(user._id);

			response.status(200).json({
				status: 200,
				success: true,
				message: "lockers imported successfully",
				data: query,
			});
		} catch (error) {
			next(error);
		}
	}

	static async findOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const user = request.user;
		const locker = request.locker;

		try {
			const query = await LockerFactory.findOne(user._id, locker._id);

			response.status(200).json({
				status: 200,
				success: true,
				message: "locker imported successfully",
				data: query,
			});
		} catch (error) {
			next(error);
		}
	}

	static async createOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const title = request.body.title;
		const description = request.body.description;

		// gates
		const user = request.user;

		try {
			await LockerFactory.createOne({
				title: title,
				description: description,
				user: user._id,
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "locker created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const title = request.body.title;
		const description = request.body.description;

		// gates
		const user = request.user;
		const locker = request.locker;

		try {
			await LockerFactory.updateOne(user._id, locker._id, {
				title,
				description,
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "locker created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	static async deleteOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const user = request.user;
		const locker = request.locker;

		try {
			await LockerFactory.deleteOne(user._id, locker._id);

			response.status(201).json({
				status: 201,
				success: true,
				message: "locker created successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}
