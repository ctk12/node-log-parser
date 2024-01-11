import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as logParser from "./logParser.service";
import ApiResponse from "../ApiMessage/ApiResponse";
import ApiMessage from "../ApiMessage/ApiMessage";
import httpStatus from "http-status";

export const logParserBody = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(ApiResponse(false, ApiMessage.Error.MISSING_PARAMETER + " " + ApiMessage.Error.FILE_NOT_FOUND));
    return;
  }
  const logResponse = await logParser.parser(file);

  res.status(httpStatus.CREATED).send(ApiResponse(true, ApiMessage.Data.PARSED_SUCCESSFULLY, logResponse));
});
