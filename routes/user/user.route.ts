import express from "express";

// security
import AuthenticationSecurity from "../authentication/authentication.security";

// validators
import { UserPayload, UserQuery, UserHeaders } from "./user.validator";

// gates
import UserGate from "./user.gate";

// controller
import UserController from "./user.controller";

const route = express.Router();

route.get(
	"/",
	// validators layer
	[UserPayload.findMe, UserQuery.findMe, UserHeaders.findMe],
	// security layer
	[AuthenticationSecurity.requireAuthentication],
	// controllers layer
	[UserController.findMe]
);

export default route;
