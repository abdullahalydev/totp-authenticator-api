// packages
import express from "express";
import bcrypt from "bcrypt";
import lodash from "lodash";

// factories
import AuthenticationFactory from "./authentication.factory";

export default class AuthenticationController {
	static async register(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const fname = request.body.fname;
		const lname = request.body.lname;
		const email = request.body.email;
		const password = request.body.password;

		try {
			const validateEmail = await AuthenticationFactory.findOneByEmail(email);
			if (validateEmail) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "email already used",
				});
				return;
			}
			
			const encryptPassword = await bcrypt.hash(password, 10);

			const user = await AuthenticationFactory.createOne({
				fname: fname,
				lname: lname,
				email: email,
				password: encryptPassword,
			});

			request.session.user = user.id;

			response.status(201).json({
				status: 201,
				success: true,
				message: "user created successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async login(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// params
		const email = request.body.email;
		const password = request.body.password;

		try {
			const user = await AuthenticationFactory.findOneByEmail(email);

			if (!user) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "email or password is wrong",
				});
				return;
			}

			const validatePassword = bcrypt.compare(password, user.password);

			if (!validatePassword) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "email or password is wrong",
				});
				return;
			}

			request.session.user = user.id;

			response.status(200).json({
				status: 200,
				success: true,
				message: "login successfully",
				data: lodash(user).pick(["fname", "lname", "email"]),
			});
		} catch (error) {
			next(error);
		}
	}

	static async status(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// user
		const user = request.user;

		try {
			response.status(200).json({
				status: 200,
				success: true,
				message: "user authentication status imported successfully",
				data: !!user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async logout(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			request.session.user = String();

			response.status(202).json({
				status: 202,
				success: true,
				message: "logout successfully"
			})
		} catch (error) {
			next(error);
		}
	}
}
