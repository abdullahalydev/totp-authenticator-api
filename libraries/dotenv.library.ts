import dotenv from "dotenv";

export default class Env {
	static init(): void {
		dotenv.config();
	}
}
