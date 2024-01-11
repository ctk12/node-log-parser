"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserByEmail = exports.getUserById = exports.queryAllUsers = exports.queryUsers = exports.registerUser = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("./user.model"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
const createUser = async (userBody) => {
    if (await user_model_1.default.isEmailTaken(userBody.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.EMAIL_TAKEN);
    }
    if (await user_model_1.default.isUserNameTaken(userBody.user_name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.USERNAME_TAKEN);
    }
    userBody.password = crypto_1.default.randomBytes(20).toString("hex");
    return user_model_1.default.create(userBody);
};
exports.createUser = createUser;
/**
 * Register a user
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IUserDoc>}
 */
const registerUser = async (userBody) => {
    if (await user_model_1.default.isEmailTaken(userBody.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.EMAIL_TAKEN);
    }
    if (await user_model_1.default.isUserNameTaken(userBody.user_name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.USERNAME_TAKEN);
    }
    return user_model_1.default.create(userBody);
};
exports.registerUser = registerUser;
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
    const users = await user_model_1.default.paginate(filter, options);
    return users;
};
exports.queryUsers = queryUsers;
/**
 * Query for all users
 * @returns {Promise<IUser[]>}
 */
const queryAllUsers = async () => {
    const users = await user_model_1.default.find();
    return users;
};
exports.queryAllUsers = queryAllUsers;
/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
const getUserById = async (id) => user_model_1.default.findById(id);
exports.getUserById = getUserById;
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
const getUserByEmail = async (email) => user_model_1.default.findOne({ email });
exports.getUserByEmail = getUserByEmail;
/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
const updateUserById = async (userId, updateBody) => {
    const user = await (0, exports.getUserById)(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.NOT_FOUND);
    }
    if (updateBody.email && (await user_model_1.default.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, ApiMessage_1.default.Error.EMAIL_TAKEN);
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};
exports.updateUserById = updateUserById;
/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 */
const deleteUserById = async (userId) => {
    const user = await (0, exports.getUserById)(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, ApiMessage_1.default.Error.NOT_FOUND);
    }
    await user.deleteOne();
    return user;
};
exports.deleteUserById = deleteUserById;
