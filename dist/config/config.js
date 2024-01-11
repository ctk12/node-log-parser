"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
require("dotenv/config");
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid("production", "development", "test").required(),
    PORT: joi_1.default.number().default(3000),
    MONGODB_URL_TEST: joi_1.default.string().required(),
    MONGODB_URL_PRODUCTION: joi_1.default.string().required(),
    MONGODB_URL_DEVELOPMENT: joi_1.default.string().required(),
    CLIENT_URL: joi_1.default.string().required().description("Client url"),
    JWT_SECRET: joi_1.default.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number().default(30).description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number().default(30).description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("minutes after which reset password token expires"),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);
if (error) {
    throw new Error(`Config env validation error: ${error.message}`);
}
const mongodbURL = (data) => {
    if (data === "production") {
        return envVars.MONGODB_URL_PRODUCTION;
    }
    if (data === "test") {
        return envVars.MONGODB_URL_TEST;
    }
    return envVars.MONGODB_URL_DEVELOPMENT;
};
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: mongodbURL(envVars.NODE_ENV),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        cookieOptions: {
            httpOnly: true,
            secure: envVars.NODE_ENV === "production",
            signed: true,
        },
    },
    clientUrl: envVars.CLIENT_URL,
    MONGODB_URL_TEST: envVars.MONGODB_URL_TEST,
    MONGODB_URL_PRODUCTION: envVars.MONGODB_URL_PRODUCTION,
    MONGODB_URL_DEVELOPMENT: envVars.MONGODB_URL_DEVELOPMENT,
};
exports.default = config;
