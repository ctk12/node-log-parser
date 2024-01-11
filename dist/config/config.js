"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
require("dotenv/config");
const envVarsSchema = joi_1.default.object()
    .keys({
    PORT: joi_1.default.number().default(3000),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);
if (error) {
    throw new Error(`Config env validation error: ${error.message}`);
}
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    clientUrl: envVars.CLIENT_URL,
};
exports.default = config;
