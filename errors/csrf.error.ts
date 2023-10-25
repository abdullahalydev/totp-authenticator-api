import express from "express";

export default class CSRFErrorHandler {
	static init(
		error: any,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (error.code === "EBADCSRFTOKEN") {
			response.status(403).json({
				status: 403,
				success: false,
				message: "invalid csrf token",
			});
		} else next(error);
	}
}
