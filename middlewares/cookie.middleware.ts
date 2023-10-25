import cookie from "cookie-parser";

export default class CookieParserMiddleware {
	static init = cookie();
}
