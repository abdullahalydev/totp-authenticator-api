import express from "express";

export default class BodyErrorHandler {
	static init(
		error: Error,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		console.log(process.env.PORT);

		if (error instanceof SyntaxError) {
			response.status(400).json({
				status: 400,
				success: false,
				message: "invalid body type",
			});
		} else next(error);
	}
}
