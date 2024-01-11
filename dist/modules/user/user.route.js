"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../modules/validate");
const user_1 = require("../../modules/user");
const auth_middleware_1 = __importDefault(require("../../modules/auth/auth.middleware"));
const router = express_1.default.Router();
const router1 = express_1.default.Router();
router
    .route("/")
    .post((0, auth_middleware_1.default)(), (0, validate_1.validate)(user_1.userValidation.createUser), user_1.userController.createUser)
    .get((0, auth_middleware_1.default)(), user_1.userController.getUsers);
router
    .route("/:userId")
    .get((0, auth_middleware_1.default)(), (0, validate_1.validate)(user_1.userValidation.getUser), user_1.userController.getUser)
    .patch((0, auth_middleware_1.default)(), (0, validate_1.validate)(user_1.userValidation.updateUser), user_1.userController.updateUser)
    .delete((0, auth_middleware_1.default)(), (0, validate_1.validate)(user_1.userValidation.deleteUser), user_1.userController.deleteUser);
router1.route("/").get((0, auth_middleware_1.default)(), user_1.userController.getAllUsers);
const routeArray = [
    {
        path: "/users",
        route: router,
    },
    {
        path: "/all-users",
        route: router1,
    },
];
exports.default = routeArray;
