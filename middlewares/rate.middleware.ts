import limit from "express-rate-limit";

export default class RateLimiterMiddleware {
	static init = limit({
		windowMs: 15 * 60 * 1000,
		max: 800,
		standardHeaders: true,
		legacyHeaders: false,
		message: {
			message: "too many requests",
		},
	});
}
