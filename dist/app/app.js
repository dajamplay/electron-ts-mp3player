"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const playerWindow_1 = __importDefault(require("./windows/playerWindow"));
class App {
    constructor() {
        this.windows = {};
    }
    run() {
        electron_1.app.whenReady().then(() => {
            this.createWindows();
            electron_1.app.on('activate', () => {
                if (electron_1.BrowserWindow.getAllWindows().length === 0) {
                    this.createWindows();
                }
            });
        });
        electron_1.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
    }
    createWindows() {
        this.windows.player = new playerWindow_1.default();
    }
}
exports.default = App;
