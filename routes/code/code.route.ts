// packages
import express from "express";

// validators
import { CodePayload, CodeHeaders, CodeQuery } from "./code.validator";

// securities
import AuthenticationSecurity from "../authentication/authentication.security";

// gates
import LockerGate from "../locker/locker.gate";
import CodeGate from "./code.gate";

// controllers
import CodeController from "./code.controller";

const route = express.Router();

route.get(
	"/:lockerId",
	[CodePayload.findMany, CodeHeaders.findMany, CodeQuery.findMany],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter],
	[CodeController.findMany]
);

route.get(
	"/:lockerId/:codeId",
	[CodePayload.findOne, CodeHeaders.findOne, CodeQuery.findOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter, CodeGate.paramter],
	[CodeController.findOne]
);

route.get(
	"/:lockerId/:codeId/generate",
	[CodePayload.findOne, CodeHeaders.findOne, CodeQuery.findOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter, CodeGate.paramter],
	[CodeController.generateOne]
);

route.patch(
	"/:lockerId/:codeId",
	[CodePayload.updateOne, CodeHeaders.updateOne, CodeQuery.updateOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter, CodeGate.paramter],
	[CodeController.updateOne]
);

route.post(
	"/:lockerId",
	[CodePayload.createOne, CodeHeaders.createOne, CodeQuery.createOne],
	[AuthenticationSecurity.requireAuthentication],
	[LockerGate.paramter],
	[CodeController.createOne]
);

route.delete(
	"/:lockerId/:codeId",
	[CodePayload.deleteOne, CodeHeaders.deleteOne, CodeQuery.deleteOne],
	[AuthenticationSecurity.requireAuthentication ],
	[LockerGate.paramter, CodeGate.paramter],
	[CodeController.deleteOne]
);

export default route;
