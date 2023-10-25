import cors from "cors";

export default class CorsMiddleware {
	static init = cors({
		origin: "http://localhost:3000",
		credentials: true,
	});
}
