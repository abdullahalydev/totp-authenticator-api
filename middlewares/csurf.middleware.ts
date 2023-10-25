import csurf from "csurf";

export default class CSURFMiddleware {
	static init = csurf({ cookie: true, sessionKey: process.env.SESSIONKEY });
}
