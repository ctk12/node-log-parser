import express, { Router } from "express";
import multer from "multer";
import { logParserController } from ".";
import { IRoute } from "../../routes";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import path from "path";
import ApiMessage from "../ApiMessage/ApiMessage";

const router: Router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1048576, // 10 MB
  },
  fileFilter(_req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".log") {
      return cb(new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.ALLOWED_FILE_TYPES));
    }

    cb(null, true);
  },
});

router.route("/").post(upload.single("file"), logParserController.logParserBody);

const routeArray: IRoute[] = [
  {
    path: "/log-parser",
    route: router,
  },
];

export default routeArray;
