"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.refreshTokens = exports.logout = exports.login = exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("../validate/custom.validation");
const registerBody = {
    user_name: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().custom(custom_validation_1.password),
    role: joi_1.default.string().required(),
    contact_number: joi_1.default.string().required(),
};
exports.register = {
    body: joi_1.default.object().keys(registerBody),
};
exports.login = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.logout = {
    body: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required(),
    }),
};
exports.refreshTokens = {
    body: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required(),
    }),
};
exports.forgotPassword = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
    }),
};
exports.resetPassword = {
    query: joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        password: joi_1.default.string().required().custom(custom_validation_1.password),
    }),
};
