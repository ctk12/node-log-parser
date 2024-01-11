import Joi from "joi";
import "dotenv/config";

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
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

export default config;
