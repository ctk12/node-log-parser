"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logParser_1 = require("../modules/logParser");
const router = express_1.default.Router();
const defaultIRoute = [...logParser_1.logParserRoute];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
