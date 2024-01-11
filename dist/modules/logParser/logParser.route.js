"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const _1 = require(".");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 1048576, // 10 MB
    },
    fileFilter(_req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== ".log") {
            return cb(new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.ALLOWED_FILE_TYPES));
        }
        cb(null, true);
    },
});
router.route("/").post(upload.single("file"), _1.logParserController.logParserBody);
const routeArray = [
    {
        path: "/log-parser",
        route: router,
    },
];
exports.default = routeArray;
