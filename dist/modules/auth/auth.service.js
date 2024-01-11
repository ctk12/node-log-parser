"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.refreshAuth = exports.logout = exports.loginUserWithEmailAndPassword = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const token_model_1 = __importDefault(require("../token/token.model"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const token_types_1 = __importDefault(require("../token/token.types"));
const user_service_1 = require("../user/user.service");
const token_service_1 = require("../token/token.service");
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await (0, user_service_1.getUserByEmail)(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, ApiMessage_1.default.Error.INCORRECT_EMAIL_PASS);
    }
    return user;
};
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await token_model_1.default.findOne({
        token: refreshToken,
        type: token_types_1.default.REFRESH,
        blacklisted: false,
    });
    if (!refreshTokenDoc) {
        throw new Error();
    }
    await refreshTokenDoc.deleteOne();
};
exports.logout = logout;
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<IUserWithTokens>}
 */
const refreshAuth = async (refreshToken) => {
    const refreshTokenDoc = await (0, token_service_1.verifyToken)(refreshToken, token_types_1.default.REFRESH);
    const user = await (0, user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(refreshTokenDoc.user));
    if (!user) {
        throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    const tokens = await (0, token_service_1.generateAuthTokens)(user);
    return { user, tokens };
};
exports.refreshAuth = refreshAuth;
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    const resetPasswordTokenDoc = await (0, token_service_1.verifyToken)(resetPasswordToken, token_types_1.default.RESET_PASSWORD);
    const user = await (0, user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(resetPasswordTokenDoc.user));
    if (!user) {
        throw new Error();
    }
    await (0, user_service_1.updateUserById)(user.id, { password: newPassword });
    await token_model_1.default.deleteMany({ user: user.id, type: token_types_1.default.RESET_PASSWORD });
    await token_model_1.default.deleteMany({ user: user.id, type: token_types_1.default.ACCESS });
    await token_model_1.default.deleteMany({ user: user.id, type: token_types_1.default.REFRESH });
};
exports.resetPassword = resetPassword;
