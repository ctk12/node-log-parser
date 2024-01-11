"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const pick_1 = __importDefault(require("../utils/pick"));
const userService = __importStar(require("./user.service"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const ApiResponse_1 = __importDefault(require("../ApiMessage/ApiResponse"));
exports.createUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(http_status_1.default.CREATED).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.CREATED_SUCCESSFULLY, user));
});
exports.getUsers = (0, catchAsync_1.default)(async (req, res) => {
    const filter = (0, pick_1.default)(req.query, ["user_name", "name", "email", "role"]);
    const options = (0, pick_1.default)(req.query, ["sortBy", "limit", "page", "projectBy"]);
    const result = await userService.queryUsers(filter, options);
    res.send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, result));
});
exports.getUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const userIdObj = new mongoose_1.default.Types.ObjectId(userId);
    if (userIdObj) {
        const user = await userService.getUserById(userIdObj);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.NOT_FOUND);
        }
        res.send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, user));
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const userIdObj = new mongoose_1.default.Types.ObjectId(userId);
    if (userIdObj) {
        const user = await userService.updateUserById(userIdObj, req.body);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.NOT_FOUND);
        }
        res.send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.UPDATED_SUCCESSFULLY, user));
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const userIdObj = new mongoose_1.default.Types.ObjectId(userId);
    if (userId === req.user.id) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.NOT_ALLOWED);
    }
    if (userIdObj) {
        await userService.deleteUserById(userIdObj);
        res.status(http_status_1.default.NO_CONTENT).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.DELETED_SUCCESSFULLY));
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.MISSING_PARAMETER);
    }
});
exports.getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await userService.queryAllUsers();
    res.send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, result));
});
