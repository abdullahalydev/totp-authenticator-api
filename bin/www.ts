// packages
import express from "express";

// libraries
import log from "../libraries/winston.library";

// middlewares
import JsonParserMiddleware from "../middlewares/json.middleware";
import UrlEncodedParserMiddleware from "../middlewares/urlencoded.middleware";
import CookieParserMiddleware from "../middlewares/cookie.middleware";
import SessionMiddleware from "../middlewares/session.middleware";

import HijackMiddleware from "../middlewares/hijack.middleware";
import CorsMiddleware from "../middlewares/cors.middleware";
import CSURFMiddleware from "../middlewares/csurf.middleware";
import HPPMiddleware from "../middlewares/hpp.middleware";
import ServerBusyMiddleware from "../middlewares/busy.middleware";
import RateLimiterMiddleware from "../middlewares/rate.middleware";

// routes
import AuthenticationRoute from "../routes/authentication/authentication.route";
import UserRoute from "../routes/user/user.route";
import CSRFRoute from "../routes/csrf/csrf.route";
import LockerRoute from "../routes/locker/locker.route";
import CodeRoute from "../routes/code/code.route";

// errors
import InternalErrorHandler from "../errors/internal.error";
import JWTErrorHandler from "../errors/jsonwebtoken.error";
import NotFoundErrorHandler from "../errors/notfound.error";
import CSRFErrorHandler from "../errors/csrf.error";
import BodyErrorHandler from "../errors/body.error";
import JOIErrorHandler from "../errors/joi.error";

const application = express();
const port: any = process.env.PORT;

export default class ExpressApplication {
	static initStandardMiddlewares(): void {
		application.use(JsonParserMiddleware.init);
		application.use(UrlEncodedParserMiddleware.init);
		application.use(CookieParserMiddleware.init);
		application.use(SessionMiddleware.init);
		application.use(SessionMiddleware.initializer);

		application.use(BodyErrorHandler.init);
	}

	static initSecurityMiddlewares(): void {
		application.use(CorsMiddleware.init);
		application.use(CSURFMiddleware.init);
		application.use(HPPMiddleware.init);
		application.use(ServerBusyMiddleware.init);
		application.use(RateLimiterMiddleware.init);
		application.use(HijackMiddleware.init);
	}

	static initMiddlewares() {
		// custom middlwares
	}

	static initRoutes(): void {
		application.get("/session/info", (req: any, res: any) => {
			res.send(req.session);
		});

		application.use("/authentication", AuthenticationRoute);
		application.use("/csrf", CSRFRoute);
		application.use("/user", UserRoute);
		application.use("/locker", LockerRoute);
		application.use("/code", CodeRoute);
	}

	static initErrorHandler() {
		application.all("*", NotFoundErrorHandler.init);

		application.use(JOIErrorHandler.init);
		application.use(CSRFErrorHandler.init);
		application.use(JWTErrorHandler.init);
		application.use(InternalErrorHandler.init);
	}

	static startExpressApplication(): void {
		application.listen(port, "0.0.0.0", function () {
			log.info(`application started successfully on port ${port}`);
		});
		return;
	}

	static getExpressApplication(): express.Application {
		return application;
	}
}
