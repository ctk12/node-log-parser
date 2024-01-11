"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse = (success, message, data) => {
    return data
        ? success
            ? {
                success,
                message,
                data,
            }
            : {
                success,
                message,
                error: data,
            }
        : {
            success,
            message,
        };
};
exports.default = ApiResponse;
