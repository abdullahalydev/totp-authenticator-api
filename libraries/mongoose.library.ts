import mongoose from "mongoose";
import log from "./winston.library";

mongoose.set("strictQuery", true);

export default class Database {
	static init() {
		mongoose
			.connect(<string>process.env.DATABASE)
			.then(function () {
				log.info("database connected successfully");
			})
			.catch((err: any) => console.log(err));
	}
}
