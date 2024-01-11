"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const pick_1 = __importDefault(require("../utils/pick"));
const validate = (schema) => (req, _res, next) => {
    const validSchema = (0, pick_1.default)(schema, ["params", "query", "body"]);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        return next(new Error(errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;