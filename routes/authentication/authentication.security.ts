// packagaes
import express from "express";
import lodash from "lodash";

// factory
import AuthenticationFactory from "./authentication.factory";

export default class AuthenticationSecurity {
	static async requireAuthentication(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const userId = request.session.user as string;

		try {
			if (!userId) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "authentication required",
				});
				return;
			}

			const user = await AuthenticationFactory.findOneById(userId);

			if (!user) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "authentication required",
				});
				return;
			}

			request.user = user;

			next();
		} catch (error) {
			next(error);
		}
	}

	static async requireNonAuthentication(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const userId = request.session.user as string;

		try {
			if (userId) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "nonauthentication required",
				});
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	}
	static async autoAuthentication(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const userId = request.session.user as string;

		try {
			if (!userId) {
				next();
				return;
			}

			const user = await AuthenticationFactory.findOneById(userId);

			if (!user) {
				next();
				return;
			}

			request.user = user;

			next();
		} catch (error) {
			next(error);
		}
	}

	static rolesAuthentication(roles: string[]) {
		return async function (
			request: express.Request,
			response: express.Response,
			next: express.NextFunction
		) {
			// user
			const user = request.user;

			try {
				const validate = !lodash(user.roles).intersection(roles).isEmpty();

				if (!validate) {
					response.status(403).json({
						status: 403,
						success: false,
						message: "cannot access on this endpoint",
					});
					return;
				}

				next();
			} catch (error) {
				next(error);
			}
		};
	}
}
