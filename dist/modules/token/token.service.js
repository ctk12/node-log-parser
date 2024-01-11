"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetPasswordToken = exports.generateAuthTokens = exports.verifyToken = exports.saveToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config/config"));
const token_model_1 = __importDefault(require("./token.model"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const token_types_1 = __importDefault(require("./token.types"));
const user_1 = require("../user");
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
/**
 * Generate token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config_1.default.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.generateToken = generateToken;
/**
 * Save a token
 * @param {string} token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<ITokenDoc>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await token_model_1.default.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};
exports.saveToken = saveToken;
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<ITokenDoc>}
 */
const verifyToken = async (token, type) => {
    const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    if (typeof payload.sub !== "string") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.NOT_FOUND);
    }
    const tokenDoc = await token_model_1.default.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error(ApiMessage_1.default.Error.NOT_FOUND);
    }
    return tokenDoc;
};
exports.verifyToken = verifyToken;
/**
 * Generate auth tokens
 * @param {IUserDoc} user
 * @returns {Promise<AccessAndRefreshTokens>}
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, "minutes");
    const accessToken = (0, exports.generateToken)(user.id, accessTokenExpires, token_types_1.default.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, "days");
    const refreshToken = (0, exports.generateToken)(user.id, refreshTokenExpires, token_types_1.default.REFRESH);
    await (0, exports.saveToken)(refreshToken, user.id, refreshTokenExpires, token_types_1.default.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
exports.generateAuthTokens = generateAuthTokens;
/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
    const user = await user_1.userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NO_CONTENT, "");
    }
    const expires = (0, moment_1.default)().add(config_1.default.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = (0, exports.generateToken)(user.id, expires, token_types_1.default.RESET_PASSWORD);
    await (0, exports.saveToken)(resetPasswordToken, user.id, expires, token_types_1.default.RESET_PASSWORD);
    return resetPasswordToken;
};
exports.generateResetPasswordToken = generateResetPasswordToken;
