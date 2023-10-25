// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export class AuthenticationPayload {
	static register = validator.body(
		Joi.object({
			fname: Joi.string().alphanum().trim().min(1).max(32).required(),
			lname: Joi.string().alphanum().trim().min(1).max(32).required(),
			email: Joi.string().email().trim().min(1).max(64).required(),
			password: Joi.string().min(8).max(64).required(),
		})
	);
	static login = validator.body(
		Joi.object({
			email: Joi.string().email().trim().min(1).max(64).required(),
			password: Joi.string().min(8).max(64).required(),
		})
	);
	static logout = validator.body(Joi.object({}));
	static status = validator.body(Joi.object({}));
}
export class AuthetnicationQuery {
	static status = validator.query(Joi.object({}));
	static login = validator.query(Joi.object({}));
	static register = validator.query(Joi.object({}));
	static logout = validator.query(Joi.object({}));
}

export class AuthenticationHeaders {
	static status = validator.headers(Joi.object({}));
	static login = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static register = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static logout = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
		})
	);
}
