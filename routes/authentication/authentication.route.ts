// packages
import express from "express";

// security
import AuthenticationSecurity from "./authentication.security";

// validators
import {
	AuthenticationPayload,
	AuthetnicationQuery,
	AuthenticationHeaders,
} from "./authentication.validator";

// controller
import AuthenticationController from "./authentication.controller";

const route = express.Router();

route.get("/", [
	// validators layer
	AuthenticationPayload.status,
	AuthetnicationQuery.status,
	AuthenticationHeaders.status,

	// securty layer
	AuthenticationSecurity.requireAuthentication,

	// controller
	AuthenticationController.status,
]);

route.post("/login", [
	// validators layer
	AuthenticationPayload.login,
	AuthetnicationQuery.login,
	AuthenticationHeaders.login,

	// securty layer
	AuthenticationSecurity.requireNonAuthentication,

	// controller
	AuthenticationController.login,
]);

route.post("/register", [
	// validators layer
	AuthenticationPayload.register,
	AuthetnicationQuery.register,
	AuthenticationHeaders.register,

	// securty layer
	AuthenticationSecurity.requireNonAuthentication,

	// controller
	AuthenticationController.register,
]);

route.delete("/logout", [
	// valodators
	AuthenticationPayload.logout,
	AuthetnicationQuery.logout,
	AuthenticationHeaders.logout,

	// securty layer
	AuthenticationSecurity.requireAuthentication,

	// controller
	AuthenticationController.logout,
]);

export default route;
