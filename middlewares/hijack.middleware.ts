// packages
import hijack from "express-session-hijack";

export default class HijackMiddleware {
	static init = hijack()
}