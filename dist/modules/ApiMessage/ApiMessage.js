"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error;
(function (Error) {
    Error["MISSING_PARAMETER"] = "The requested resource is missing required parameters.";
    Error["FILE_NOT_FOUND"] = "File not found";
    Error["NOT_FOUND"] = "We could not find the resource you requested";
    Error["FAILED_PARSE"] = "Log file parse failed";
    Error["ALLOWED_FILE_TYPES"] = "Only .log files are allowed";
})(Error || (Error = {}));
var Data;
(function (Data) {
    Data["SUCCESS"] = "Success";
    Data["PARSED_SUCCESSFULLY"] = "Log file parsed successfully";
})(Data || (Data = {}));
const ApiMessage = {
    Error,
    Data,
};
exports.default = ApiMessage;
