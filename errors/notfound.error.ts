import express from "express";

export default class NotFoundErrorHandler {
	static init(request: express.Request, response: express.Response) {
		response.status(404).json({
			status: 400,
			success: false,
			message: "endpoint not found",
		});
	}
}
