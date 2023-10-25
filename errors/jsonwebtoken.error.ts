// out-date
import express from "express";

export default class JWTErrorHandler {
	static init(
		error: Error,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (
			error.name === "TokenExpiredError" ||
			error.name === "JsonWebTokenError" ||
			error.name === "NotBeforeError"
		) {
			response.status(500).json({
				message: "invalid token",
			});
		}
        else next(error);
	}
}
