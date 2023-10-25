// pacakges
import express from "express";
import session from "express-session";
import mongo from "connect-mongo";
import ms from "ms";

export default class SessionMiddleware {
	static init = session({
		secret: process.env.SESSIONKEY,
		name: "session",
		store: new mongo({
			mongoUrl: process.env.DATABASE,
			crypto: { secret: process.env.SESSIONKEY },
		}),
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: ms("7 days"),
		},
	});
	static async initializer(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (!request.session.initialized) {
			request.session.initialized = true;
			request.session.user = String();
		}

		next();
	}
}
