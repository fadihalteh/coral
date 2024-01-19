"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.updateUserDetails = exports.getUserDetails = exports.changeUsername = exports.changePassword = exports.checkSessionId = exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const db = require('../Database/Models/index');
const joi_1 = __importDefault(require("joi"));
const bcrypt = require('bcrypt');
const passwordSchema = joi_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().min(8).max(254);
const createUserSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email().min(5).max(254).required(),
    password: passwordSchema,
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    mobile: joi_1.default.string()
        .pattern(/^(\+\d{1,3}[- ]?)?(\d{3}[- ]?)?\d{4}[- ]?\d{3}$/)
        .message('Please provide a valid mobile number')
        .required(),
    birth_date: joi_1.default.string()
        .isoDate() // Validate as an ISO date (YYYY-MM-DD)
        .message('Please provide a valid birth date in the format YYYY-MM-DD')
        .required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(254).required(),
    password: passwordSchema,
});
const changePasswordSchema = joi_1.default.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema
});
const changeUsernameSchema = joi_1.default.object({
    newUsername: joi_1.default.string().min(3).max(50).required(),
});
const updateUserSchema = joi_1.default.object({
    first_name: joi_1.default.string(),
    last_name: joi_1.default.string(),
    mobile: joi_1.default.string()
        .pattern(/^(\+\d{1,3}[- ]?)?(\d{3}[- ]?)?\d{4}[- ]?\d{3}$/)
        .message('Please provide a valid mobile number'),
    birth_date: joi_1.default.string()
        .isoDate() // Validate as an ISO date (YYYY-MM-DD)
        .message('Please provide a valid birth date in the format YYYY-MM-DD')
});
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { username, email, password, first_name, last_name, mobile, birth_date } = value;
        const existingEmail = yield db.users.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already in Use' });
        }
        const existingUsername = yield db.users.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already in Use' });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield db.users.create({ username, email, password: hashedPassword, first_name, last_name, mobile, birth_date });
        const session_key = generateRandomString(30);
        const newSession = yield db.sessions.create({ user_id: newUser.id, session_key });
        return res.status(200).json(newSession);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { email, password } = value;
        let user = yield db.users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User with this Email/Username doesn\'t exist' });
        }
        let matchPassword = yield bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }
        const session_key = generateRandomString(20);
        const newSession = yield db.sessions.create({ user_id: user.id, session_key });
        return res.status(200).json(newSession);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSession = yield db.sessions.destroy({ where: { session_key: req.session.session_key } });
        return res.status(200).json(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.logoutUser = logoutUser;
const checkSessionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session_key = req.headers['authorization'];
        if (!session_key) {
            return res.status(401).json({ error: 'Session ID is missing in the headers.' });
        }
        // Check if the session exists
        const session = yield db.sessions.findOne({ where: { session_key } });
        if (!session) {
            return res.status(403).json({ error: 'Invalid session ID.' });
        }
        //  req.body.session=session
        req.session = session;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.checkSessionId = checkSessionId;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the new password (you can use your own validation logic)
        const { error, value } = changePasswordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { currentPassword, newPassword } = value;
        let user = req.session.user_id;
        let matchPassword = yield bcrypt.compare(currentPassword, user.password);
        if (!matchPassword) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }
        // Hash the new password
        const hashedPassword = yield bcrypt.hash(newPassword, 10);
        // Update the user's password in the database
        yield db.users.update({ password: hashedPassword }, { where: { id: user.id } });
        // Delete all sessions associated with the user
        yield db.sessions.destroy({ where: { user_id: user.id } });
        return res.status(200).json(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.changePassword = changePassword;
const changeUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the new password (you can use your own validation logic)
        const { error, value } = changeUsernameSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { newUsername } = value;
        yield db.users.update({ username: newUsername }, { where: { id: req.session.user_id } });
        return res.status(200).json(true);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.changeUsername = changeUsername;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.users.findOne({ where: { id: req.session.user_id } });
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getUserDetails = getUserDetails;
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = yield db.users.update(value, { where: { id: req.session.user_id } });
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateUserDetails = updateUserDetails;
const deleteUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.users.destroy({ where: { id: req.session.user_id } });
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteUserAccount = deleteUserAccount;
