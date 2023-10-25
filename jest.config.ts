import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["dotenv/config"],
	rootDir: "./test",
	testTimeout: 30 * 1000,
};

export default config;
