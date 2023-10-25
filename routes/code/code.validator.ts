// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export class CodePayload {
	static findMany = validator.body(Joi.object({}));
	static findOne = validator.body(Joi.object({}));
	static createOne = validator.body(
		Joi.object({
			title: Joi.string().min(1).max(125).example("Personal").required(),
			secret: Joi.string().min(1).max(255).example("Personal").required(),
			encoding: Joi.string().min(1).max(255).valid("ascii", "hex", "base32", "base64").example("Personal").required(),
			step: Joi.number().min(10).max(120).example("Personal").required(),
			digits: Joi.number().min(6).max(12).example("Personal").required(),
		})
	);
	static updateOne = validator.body(
		Joi.object({
			title: Joi.string().min(1).max(125).example("Personal").optional(),
			description: Joi.string().min(1).max(255).example("Personal").optional(),
		})
	);
	static deleteOne = validator.body(Joi.object({}));
}

export class CodeQuery {
	static findMany = validator.query(Joi.object({}));
	static findOne = validator.query(Joi.object({}));
	static createOne = validator.query(Joi.object({}));
	static updateOne = validator.query(Joi.object({}));
	static deleteOne = validator.query(Joi.object({}));
}

export class CodeHeaders {
	static findMany = validator.headers(Joi.object({}));
	static findOne = validator.headers(Joi.object({}));
	static createOne = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static updateOne = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static deleteOne = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
		})
	);
}
