// schemas
import UserSchema from "../../schemas/user.schema";

export default class AuthenticationFactory {
	static async findOneById(id: string) {
		const query = await UserSchema.findById(id)
			.select(["fname", "lname", "email", "phone", "roles", "password"])

		return query;
	}
	static async findOneByEmail(email: string) {
		const query = await UserSchema.findOne()
			.and([{ email }])
			.select(["fname", "lname", "email", "phone", "roles", "password"])

		return query;
	}
	static async createOne(payload: object) {
		const query = await UserSchema.create(payload);

		return query;
	}
}
