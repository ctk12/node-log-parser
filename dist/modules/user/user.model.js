"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const toJSON_1 = __importDefault(require("../toJSON/toJSON"));
const user_interfaces_1 = require("./user.interfaces");
const ApiMessage_1 = __importDefault(require("../ApiMessage/ApiMessage"));
const constants_1 = require("../../config/constants");
const paginate_1 = __importDefault(require("../paginate/paginate"));
const userSchema = new mongoose_1.default.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error(ApiMessage_1.default.Error.INVALID_EMAIL);
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(ApiMessage_1.default.Error.PASSWORD_REQUIRMENTS);
            }
        },
        private: true, // used by the toJSON plugin
    },
    role: {
        type: String,
        enum: user_interfaces_1.roleType,
        default: user_interfaces_1.roleType.USER,
    },
    contact_number: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
userSchema.plugin(toJSON_1.default);
userSchema.plugin(paginate_1.default);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static("isEmailTaken", async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
});
/**
 * Check if username is taken
 * @param {string} userName - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.static("isUserNameTaken", async function (userName, excludeUserId) {
    const user = await this.findOne({
        user_name: userName,
        _id: { $ne: excludeUserId },
    });
    return !!user;
});
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.method("isPasswordMatch", async function (password) {
    const user = this;
    return bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
});
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs_1.default.hash(user.password, 8);
    }
    next();
});
const User = mongoose_1.default.model(constants_1.dbCollections.users, userSchema);
exports.default = User;
