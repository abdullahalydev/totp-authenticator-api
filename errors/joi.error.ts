import express from "express";

export default class JOIErrorHandler {
	static init(
		error: any,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (error.error && error.error.isJoi) {
			response.status(400).json({
				status: 400,
				success: false,
				message: error.error.details[0].message,
			});
		} else next(error);
	}
}
