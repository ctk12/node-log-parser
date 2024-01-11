import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import { ApiError, errorConverter, errorHandler } from "./modules/errors";
import httpStatus from "http-status";
import ApiMessage from "./modules/ApiMessage/ApiMessage";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, ApiMessage.Error.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
