"use strict";
// userService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpiredSessions = exports.deleteUserAccount = exports.updateUserDetails = exports.getUserDetails = exports.changeUsername = exports.changePassword = exports.checkSessionKey = exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const index_1 = __importDefault(require("../Database/Models/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Function to generate a random string, if not already implemented
const utils_1 = require("../Utils/utils");
const createUser = async (input) => {
    const { username, email, password, first_name, last_name, mobile, birth_date, } = input;
    try {
        const existingEmail = await index_1.default.users.findOne({ where: { email } });
        if (existingEmail) {
            throw { code: 409, message: "Email already in Use" };
        }
        const existingUsername = await index_1.default.users.findOne({ where: { username } });
        if (existingUsername) {
            throw { code: 409, message: "Username already in Use" };
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = (await index_1.default.users.create({
            username,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            mobile,
            birth_date,
        }));
        const session_key = (0, utils_1.generateRandomString)(30);
        const newSession = (await index_1.default.sessions.create({
            user_id: newUser.id,
            session_key,
        }));
        return newSession;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.createUser = createUser;
const loginUser = async (input) => {
    const { email, password } = input;
    try {
        const user = await index_1.default.users.findOne({ where: { email } });
        if (!user) {
            throw {
                code: 404,
                message: "User with this Email/Username doesn't exist",
            };
        }
        const matchPassword = await bcrypt_1.default.compare(password, user.password);
        if (!matchPassword) {
            throw { code: 401, message: "Password is incorrect" };
        }
        const session_key = (0, utils_1.generateRandomString)(20);
        const newSession = await index_1.default.sessions.create({
            user_id: user.id,
            session_key,
        });
        return newSession;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.loginUser = loginUser;
const logoutUser = async (session) => {
    try {
        await index_1.default.sessions.destroy({ where: { session_key: session.session_key } });
        return true;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.logoutUser = logoutUser;
const checkSessionKey = async (sessionKey) => {
    try {
        const session = await index_1.default.sessions.findOne({
            where: { session_key: sessionKey },
        });
        if (!session || session.expiry_date < new Date()) {
            throw { code: 403, message: "Invalid session Key." };
        }
        return session;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.checkSessionKey = checkSessionKey;
const changePassword = async (input, session) => {
    try {
        const { currentPassword, newPassword } = input;
        const user = await index_1.default.users.findOne({
            where: { id: session.user_id },
        });
        const matchPassword = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!matchPassword) {
            throw { code: 401, message: "Password is incorrect" };
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await index_1.default.users.update({ password: hashedPassword }, { where: { id: user.id } });
        await index_1.default.sessions.destroy({ where: { user_id: user.id } });
        return true;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.changePassword = changePassword;
const changeUsername = async (input, session) => {
    try {
        const { newUsername } = input;
        const existingUsername = await index_1.default.users.findOne({ where: { username: newUsername } });
        if (existingUsername) {
            throw { code: 409, message: "Username already in Use" };
        }
        await index_1.default.users.update({ username: newUsername }, { where: { id: session.user_id } });
        return true;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.changeUsername = changeUsername;
const getUserDetails = async (session) => {
    try {
        const user = await index_1.default.users.findOne({ where: { id: session.user_id } });
        return user;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.getUserDetails = getUserDetails;
const updateUserDetails = async (input, session) => {
    try {
        const { first_name, last_name, mobile, birth_date } = input;
        const user = await index_1.default.users.update({ first_name, last_name, mobile, birth_date }, { where: { id: session.user_id } });
        return true;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.updateUserDetails = updateUserDetails;
const deleteUserAccount = async (session) => {
    try {
        const user = await index_1.default.users.destroy({ where: { id: session.user_id } });
        return true;
    }
    catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
        }
        else {
            throw { code: 500, message: "Internal Server Error" };
        }
    }
};
exports.deleteUserAccount = deleteUserAccount;
const deleteExpiredSessions = async () => {
    try {
        // Find sessions that have already expired
        const expiredSessions = await index_1.default.sessions.findAll({
            where: {
                expiry_date: { [index_1.default.Sequelize.Op.lt]: new Date() },
            },
        });
        // Delete the expired sessions
        await index_1.default.sessions.destroy({
            where: {
                expiry_date: { [index_1.default.Sequelize.Op.lt]: new Date() },
            },
        });
        console.log(`${expiredSessions.length} expired sessions deleted.`);
    }
    catch (error) {
        throw new Error('Failed to delete expired sessions');
    }
};
exports.deleteExpiredSessions = deleteExpiredSessions;
