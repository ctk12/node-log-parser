enum Error {
  MISSING_PARAMETER = "The requested resource is missing required parameters.",
  FILE_NOT_FOUND = "File not found",
  NOT_FOUND = "We could not find the resource you requested",
  FAILED_PARSE = "Log file parse failed",
  ALLOWED_FILE_TYPES = "Only .log files are allowed",
}

enum Data {
  SUCCESS = "Success",
  PARSED_SUCCESSFULLY = "Log file parsed successfully",
}

const ApiMessage = {
  Error,
  Data,
};

export default ApiMessage;
