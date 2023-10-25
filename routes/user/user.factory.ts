// schemas
import UserSchema from "../../schemas/user.schema";

export default class UserFactory {
	static async findOne(userId: string) {
		const query = UserSchema.findById(userId)
			.select(["fname", "lname", "email", "phone", "roles"])

		return query;
	}
}
