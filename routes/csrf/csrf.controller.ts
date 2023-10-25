// packages
import express from "express";

export default class CSRFController {
	static get(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const token = request.csrfToken();

			response.status(201).json({
				status: 201,
				success: true,
				message: "token generated successfully",
				data: token,
			});
		} catch (error) {
			next(error);
		}
	}
}
