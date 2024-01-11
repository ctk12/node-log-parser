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
exports.resetPassword = exports.forgotPassword = exports.refreshTokens = exports.logout = exports.login = exports.register = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const token_1 = require("../token");
const user_1 = require("../user");
const authService = __importStar(require("./auth.service"));
const ApiResponse_1 = __importDefault(require("../ApiMessage/ApiResponse"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
exports.register = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const user = await user_1.userService.registerUser(req.body);
        const tokens = await token_1.tokenService.generateAuthTokens(user);
        res.status(http_status_1.default.CREATED).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, { user, tokens }));
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).send((0, ApiResponse_1.default)(false, error.message));
    }
});
exports.login = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const tokens = await token_1.tokenService.generateAuthTokens(user);
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, { user, tokens }));
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).send((0, ApiResponse_1.default)(false, error.message));
    }
});
exports.logout = (0, catchAsync_1.default)(async (req, res) => {
    try {
        await authService.logout(req.body.refreshToken);
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.LOGOUT_SUCCESS));
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).send((0, ApiResponse_1.default)(false, error.message));
    }
});
exports.refreshTokens = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, userWithTokens));
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).send((0, ApiResponse_1.default)(false, error.message));
    }
});
exports.forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const resetPasswordToken = await token_1.tokenService.generateResetPasswordToken(req.body.email);
        res
            .status(http_status_1.default.OK)
            .send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.SUCCESS, { email: req.body.email, resetToken: resetPasswordToken }));
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).send((0, ApiResponse_1.default)(false, error.message));
    }
});
exports.resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    try {
        await authService.resetPassword(String(req.query["token"]), req.body.password);
        res.status(http_status_1.default.OK).send((0, ApiResponse_1.default)(true, ApiMessage_1.default.Data.PASSWORD_RESET_SUCCESS));
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).send((0, ApiResponse_1.default)(false, error.message));
    }
});
