// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export class CSRFPayload {
	static get = validator.body(Joi.object({}));
}

export class CSRFQuery {
	static get = validator.query(Joi.object({}));
}

export class CSRFHeaders {
	static get = validator.headers(Joi.object({}));
}
