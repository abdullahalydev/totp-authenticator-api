// schemas
import LockerSchema from "../../schemas/locker.schema";

export default class LockerFactory {
	static async findMany(userId: string) {
		const query = await LockerSchema.find().and([{ userId }]).select({
			chainId: true,
			title: true,
			description: true,
			star: true,
		});

		return query;
	}

	static async findOne(userId: string, lockerId: string) {
		const query = await LockerSchema.findById(lockerId)
			.and([{ user: userId }])
			.populate({
				path: "user",
				select: {
					fname: true,
					lname: true,
					email: true,
				},
			})
			.select({
				chainId: true,
				title: true,
				description: true,
				star: true,
			}).lean()

		return query;
	}

	static async createOne(payload: object) {
		const query = await LockerSchema.create(payload);

		return query;
	}

	static async updateOne(userId: string, lockerId: string, payload: object) {
		const query = await LockerSchema.findByIdAndUpdate(lockerId, payload).and([
			{ user: userId },
		]);
		return query;
	}

	static async deleteOne(userId: string, lockerId: string) {
		const query = await LockerSchema.findByIdAndRemove(lockerId).and([
			{ user: userId },
		]);
		return query;
	}
}
