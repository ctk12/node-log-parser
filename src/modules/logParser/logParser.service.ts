import { LogResponse } from "./logParser.interfaces";
import ApiMessage from "../ApiMessage/ApiMessage";
import { ApiError } from "../errors";
import httpStatus from "http-status";

/**
 * Parse log file
 * @param {any} file
 * @returns {Promise<LogResponse[]>}
 */
export const parser = async (file: any): Promise<LogResponse[]> => {
  try {
    const buffer = file.buffer;
    const text = buffer.toString("utf-8");
    const fileArray = text.split("\n");

    const modifyArray = fileArray.filter((data: any) => ["error", "warn"].includes(data.split(" - ")[1]));

    const logResponse = modifyArray.map((data: any) => {
      const dataSplit = data.split(" - ");
      const dataObject = JSON.parse(dataSplit[2]);
      return {
        timestamp: new Date(dataSplit[0]).getTime(),
        loglevel: dataSplit[1],
        transactionId: dataObject.transactionId,
        err: dataObject.err,
      };
    });

    return logResponse;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, ApiMessage.Error.FAILED_PARSE);
  }
};
