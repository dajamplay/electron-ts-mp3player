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
Object.defineProperty(exports, "__esModule", { value: true });
const storage = require("electron-json-storage");
const fs = require("fs");
const path = require("path");
class Storage {
    constructor() {
        storage.setDataPath(__dirname + '../../../storage');
        this.playListFileName = 'playlist';
    }
    savePlaylist(loadedPlaylist) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                storage.set(this.playListFileName, loadedPlaylist, () => resolve());
            });
        });
    }
    get(playListFileName) {
        if (this.hasPlaylistFile(playListFileName))
            return storage.getSync(playListFileName);
        return [];
    }
    hasPlaylistFile(playListFileName) {
        let pathFile = path.join(storage.getDataPath().toString(), playListFileName + '.json');
        return fs.existsSync(pathFile) && fs.statSync(pathFile).size > 0;
    }
}
exports.default = Storage;
