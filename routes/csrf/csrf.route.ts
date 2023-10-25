// packages
import express from "express";

// paylaod
import { CSRFPayload, CSRFQuery, CSRFHeaders } from "./csrf.validator";

// controllers
import CSRFController from "./csrf.controller";

const route = express.Router();

route.get("/", [
	// validators layer
	CSRFPayload.get,
	CSRFQuery.get,
	CSRFHeaders.get,

	// controller layer
	CSRFController.get,
]);

export default route;
