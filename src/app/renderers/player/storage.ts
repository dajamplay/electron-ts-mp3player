const storage = require("electron-json-storage");
const fs = require("fs");
const path = require("path");
import Track from "./track";

export default class Storage {
    private readonly playListFileName: string;
    constructor() {
        storage.setDataPath(__dirname + '../../../storage')
        this.playListFileName = 'playlist'
    }

    async savePlaylist(loadedPlaylist: Track[] | []) {
        return new Promise<void>((resolve, reject) => {
            storage.set(this.playListFileName, loadedPlaylist, () => resolve())
        });
    }

    get(playListFileName: string) {
        if (this.hasPlaylistFile(playListFileName)) return storage.getSync(playListFileName)
        return []
    }

    hasPlaylistFile(playListFileName: string) {
        let pathFile = path.join(storage.getDataPath().toString(), playListFileName + '.json')
        return fs.existsSync(pathFile) && fs.statSync(pathFile).size > 0
    }
}