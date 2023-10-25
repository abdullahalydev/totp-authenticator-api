import body from "body-parser";

export default class JsonParserMiddleware {
	static init = body.json({
		limit: "100kb",
	});
	
}
