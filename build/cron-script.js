"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const userService_1 = require("./src/Services/userService");
node_cron_1.default.schedule('0 0 */10 * *', async () => {
    try {
        console.log('Running the cron job to delete expired sessions...');
        await (0, userService_1.deleteExpiredSessions)();
        console.log('Expired sessions deleted successfully.');
    }
    catch (error) {
    }
});
// Keep the script running
process.stdin.resume();
