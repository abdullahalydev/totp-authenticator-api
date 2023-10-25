// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export class UserPayload {
	static findMe = validator.body(Joi.object({}));
}

export class UserQuery {
	static findMe = validator.query(Joi.object({}));
}

export class UserHeaders {
	static findMe = validator.headers(Joi.object({}));
}
