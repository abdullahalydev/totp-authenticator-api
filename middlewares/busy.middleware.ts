import express from "express";
import busy from "toobusy-js";

export default class ServerBusyMiddleware {
	static init(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (busy()) {
			return response
				.status(503)
				.json({ success: false, message: "server too busy" });
		} else {
			next();
		}
	}
}
