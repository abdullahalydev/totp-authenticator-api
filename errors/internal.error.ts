import express from "express";

export default class InternalErrorHandler {
	static init(
		error: Error,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		response.status(500).json({
			status: 400,
			success: false,
			message: "internal server error",
			data: {
				name: error.name,
				message: error.message,
				stack: error.stack,
			},
		});
	}
}
