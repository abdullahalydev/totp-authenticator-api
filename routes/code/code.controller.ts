// packages
import express from "express";
import speakeasy from "speakeasy";
import lodash from "lodash";

// factories
import CodeFactory from "./code.factory";

export default class CodeController {
	static async findMany(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const locker = request.locker;

		try {
			const query = await CodeFactory.findMany(locker._id);

			const codes = lodash(query).map(function (code) {
				const totp = speakeasy.totp({
					secret: code.secret,
					encoding: code.encoding,
					digits: code.digits,
					step: code.step,
				});
				const time =
					code.step - Math.floor((new Date().getTime() / 1000.0) % code.step);

				return lodash(code).set("code", totp).set("time", time);
			});

			response.status(200).json({
				status: 200,
				success: true,
				message: "codes imported successfully",
				data: codes,
			});
		} catch (error) {
			next(error);
		}
	}

	static async findOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const locker = request.locker;
		const code = request.code;

		try {
			const query = await CodeFactory.findOne(locker._id, code._id);

			const totp = speakeasy.totp({
				secret: code.secret,
				encoding: code.encoding,
				digits: code.digits,
				step: code.step,
			});
			const time =
				code.step - Math.floor((new Date().getTime() / 1000.0) % code.step);

			const generate = lodash(query).set("code", totp).set("time", time);

			response.status(200).json({
				status: 200,
				success: true,
				message: "code imported successfully",
				data: generate,
			});
		} catch (error) {
			next(error);
		}
	}

	static async generateOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const code = request.code;

		try {
			const generate = speakeasy.totp({
				secret: code.secret,
				encoding: code.encoding,
				digits: code.digits,
				step: code.step,
			});
			const time =
				code.step - Math.floor((new Date().getTime() / 1000.0) % code.step);

			response.status(200).json({
				status: 200,
				success: true,
				message: "code imported successfully",
				data: {
					code: generate,
					time: time,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	static async createOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const title = request.body.title;
		const secret = request.body.secret;
		const encoding = request.body.encoding;
		const step = request.body.step;
		const digits = request.body.digits;

		// gates
		const locker = request.locker;

		try {
			await CodeFactory.createOne({
				title: title,
				secret: secret,
				encoding: encoding,
				step: step,
				digits: digits,
				locker: locker._id,
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "code created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const title = request.body.title;
		const secret = request.body.secret;
		const encoding = request.body.encoding;
		const step = request.body.step;
		const digits = request.body.digits;

		// gates
		const locker = request.locker;
		const code = request.code;

		try {
			await CodeFactory.updateOne(locker._id, code._id, {
				title,
				secret,
				encoding,
				step,
				digits,
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "code created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	static async deleteOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// gates
		const locker = request.locker;
		const code = request.code;

		try {
			await CodeFactory.deleteOne(locker._id, code._id);

			response.status(201).json({
				status: 201,
				success: true,
				message: "code created successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}
