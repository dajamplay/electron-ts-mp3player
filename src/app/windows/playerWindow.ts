import * as path from "path";
const { app, BrowserWindow, ipcMain } = require('electron')

export default class PlayerWindow extends BrowserWindow {
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
        this.webContents.openDevTools()
        this.loadFile(__dirname + '/../views/player.html')
        this.on('close', (event: any) => {
            event.preventDefault()
            this.closeWindow()
        })
        this.on('move', (event: any) => {
            event.preventDefault()
            const x = this.getPosition()[0]
            const y = this.getPosition()[1]
            // windows.playlist.setPosition(x - 400, y)
        })
        // this.removeMenu();

        ipcMain.on('playerWindow', (event, params: any) => {
            const action = params.action
            eval("this." + action + "()");
            // this.webContents.send('playerRenderer');
        })

    }

    closeWindow() {
        app.exit()
    }

    minWindow() {
        this.minimize()
    }

    maxWindow() {
        if (!this.isMaximized()) {
            this.maximize()
        } else {
            this.unmaximize()
        }
    }
}