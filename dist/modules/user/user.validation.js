"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("../validate/custom.validation");
const createUserBody = {
    user_name: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().optional(),
    role: joi_1.default.string().required(),
    contact_number: joi_1.default.string().required(),
};
exports.createUser = {
    body: joi_1.default.object().keys(createUserBody),
};
exports.getUsers = {
    query: joi_1.default.object().keys({
        user_name: joi_1.default.string(),
        name: joi_1.default.string(),
        email: joi_1.default.string(),
        role: joi_1.default.string(),
        sortBy: joi_1.default.string(),
        projectBy: joi_1.default.string(),
        limit: joi_1.default.number().integer(),
        page: joi_1.default.number().integer(),
    }),
};
exports.getUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
};
exports.updateUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
    body: joi_1.default.object()
        .keys({
        user_name: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        contact_number: joi_1.default.string().required(),
    })
        .min(1),
};
exports.deleteUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.required().custom(custom_validation_1.objectId),
    }),
};
