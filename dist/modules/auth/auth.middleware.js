"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const user_interfaces_1 = require("../user/user.interfaces");
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    var _a;
    if (err || info || !user) {
        return reject(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, ApiMessage_1.default.Error.UNAUTHORIZED));
    }
    req.user = user;
    const requiredRight = {
        books: "books",
        users: "users",
        transactions: "transactions",
    }[req.baseUrl.split("/")[2] ? req.baseUrl.split("/")[2].replace(/-/g, "_") : "NO"];
    const requiredRightRole = {
        GET: "isRead",
        POST: "isCreate",
        PATCH: "isEdit",
        DELETE: "isDelete",
    }[req.method];
    if ((user === null || user === void 0 ? void 0 : user.role) === user_interfaces_1.roleType.USER) {
        if (requiredRight === "users") {
            const { userId } = req.params;
            if (!userId || userId !== ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return reject(new ApiError_1.default(http_status_1.default.FORBIDDEN, ApiMessage_1.default.Error.FORBIDDEN));
            }
        }
        if (requiredRight === "books") {
            if (requiredRightRole !== "isRead") {
                return reject(new ApiError_1.default(http_status_1.default.FORBIDDEN, ApiMessage_1.default.Error.FORBIDDEN));
            }
        }
    }
    resolve();
};
const auth = () => async (req, res, next) => new Promise((resolve, reject) => {
    passport_1.default.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
})
    .then(() => next())
    .catch((err) => next(err));
exports.default = auth;
