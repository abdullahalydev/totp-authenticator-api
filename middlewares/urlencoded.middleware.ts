import body from "body-parser";

export default class UrlEncodedParserMiddleware {
	static init = body.urlencoded({
		extended: false,
	});
}
