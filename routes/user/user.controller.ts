// pacakges
import express from "express";

// factories
import UserFactory from "./user.factory";

export default class UserController {
	static async findMe(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const user = request.user;

		try {
			const query = await UserFactory.findOne(user._id);

			response.status(200).json({
				status: 200,
				success: true,
				message: "user imported successfully",
				data: query,
			});
		} catch (error) {
			next(error);
		}
	}

}
