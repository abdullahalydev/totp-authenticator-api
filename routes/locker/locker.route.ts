// packages
import express from "express";

// validators
import { LockerPayload, LockerHeaders, LockerQuery } from "./locker.validator";

// securities
import AuthenticationSecurity from "../authentication/authentication.security";

// gates
import LockerGate from "./locker.gate";

// controllers
import LockerController from "./locker.controller";

const route = express.Router();

route.get(
	"/",
	[LockerPayload.findMany, LockerHeaders.findMany, LockerQuery.findMany],
	[AuthenticationSecurity.requireAuthentication],
	[],
	[LockerController.findMany]
);

route.get(
	"/:lockerId",
	[LockerPayload.findOne, LockerHeaders.findOne, LockerQuery.findOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter],
	[LockerController.findOne]
);

route.patch(
	"/:lockerId",
	[LockerPayload.updateOne, LockerHeaders.updateOne, LockerQuery.updateOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter],
	[LockerController.updateOne]
);

route.post(
	"/",
	[LockerPayload.createOne, LockerHeaders.createOne, LockerQuery.createOne],
	[AuthenticationSecurity.requireAuthentication],
	[],
	[LockerController.createOne]
);

route.delete(
	"/:lockerId",
	[LockerPayload.deleteOne, LockerHeaders.deleteOne, LockerQuery.deleteOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter],
	[LockerController.deleteOne]
);

export default route;
