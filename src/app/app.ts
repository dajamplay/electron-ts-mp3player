import { app, BrowserWindow } from 'electron'
import PlayerWindow from "./windows/playerWindow";

interface AppWindows {
    player?: BrowserWindow,
    playlist?: BrowserWindow,
}

export default class App {

    private windows: AppWindows = {}

    public run() {
        app.whenReady().then(() => {
            this.createWindows()

            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    this.createWindows()
                }
            })

        })
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        })
    }


    private createWindows() {
        this.windows.player = new PlayerWindow()
    }
}