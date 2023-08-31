"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const { app, BrowserWindow, ipcMain } = require('electron');
class PlayerWindow extends BrowserWindow {
    constructor() {
        super({
            width: 400,
            minWidth: 400,
            maxWidth: 400,
            height: 900,
            maxHeight: 1028,
            frame: false,
            y: 0,
            x: 1920 - 405,
            title: "Maks Player",
            resizable: true,
            useContentSize: true,
            transparent: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, '..', 'preloaders', 'playerPreload.js')
            },
        });
        this.webContents.openDevTools();
        this.loadFile(__dirname + '/../views/player.html');
        this.on('close', (event) => {
            event.preventDefault();
            this.closeWindow();
        });
        this.on('move', (event) => {
            event.preventDefault();
            const x = this.getPosition()[0];
            const y = this.getPosition()[1];
            // windows.playlist.setPosition(x - 400, y)
        });
        // this.removeMenu();
        ipcMain.on('playerWindow', (event, params) => {
            const action = params.action;
            eval("this." + action + "()");
            // this.webContents.send('playerRenderer');
        });
    }
    closeWindow() {
        app.exit();
    }
    minWindow() {
        this.minimize();
    }
    maxWindow() {
        if (!this.isMaximized()) {
            this.maximize();
        }
        else {
            this.unmaximize();
        }
    }
}
exports.default = PlayerWindow;
