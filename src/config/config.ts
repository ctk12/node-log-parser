import Joi from "joi";
import "dotenv/config";

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development", "test").required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL_TEST: Joi.string().required(),
    MONGODB_URL_PRODUCTION: Joi.string().required(),
    MONGODB_URL_DEVELOPMENT: Joi.string().required(),
    CLIENT_URL: Joi.string().required().description("Client url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw new Error(`Config env validation error: ${error.message}`);
}

const mongodbURL = (data: string) => {
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

export default config;
