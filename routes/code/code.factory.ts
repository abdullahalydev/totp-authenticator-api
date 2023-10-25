// schemas
import CodeSchema from "../../schemas/code.schema";

export default class CodeFactory {
	static async findMany(lockerId: string) {
		const query = await CodeSchema.find()
			.and([{ locker: lockerId }])
			.select({
				chainId: true,
				title: true,
				secret: true,
				encoding: true,
				step: true,
				digits: true,
				star: true,
			})
			.lean();
		return query;
	}

	static async findOne(lockerId: string, codeId: string) {
		const query = await CodeSchema.findById(codeId)
			.and([{ locker: lockerId }])
			.populate({
				path: "locker",
				select: {
					fname: true,
					lname: true,
					email: true,
				},
			})
			.select({
				chainId: true,
				title: true,
				secret: true,
				encoding: true,
				step: true,
				digits: true,
				star: true,
			});

		return query;
	}

	static async createOne(payload: object) {
		const query = await CodeSchema.create(payload);

		return query;
	}

	static async updateOne(lockerId: string, codeId: string, payload: object) {
		const query = await CodeSchema.findByIdAndUpdate(codeId, payload).and([
			{ locker: lockerId },
		]);

		return query;
	}

	static async deleteOne(lockerId: string, codeId: string) {
		const query = await CodeSchema.findByIdAndRemove(codeId).and([
			{ locker: lockerId },
		]);

		return query;
	}
}
