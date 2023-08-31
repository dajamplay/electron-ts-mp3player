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
class Playlist {
    constructor(playlist) {
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.loadPlaylist(playlist);
    }
    loadPlaylist(playlist) {
        if (playlist.length > 0) {
            this.playlist = playlist;
            this.currentTrackIndex = 0;
            return true;
        }
        return false;
    }
    getPlaylist() {
        return this.playlist;
    }
    getCurrentTrack() {
        return this.playlist[this.currentTrackIndex];
    }
    deleteTrackByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.playlist.splice(index, 1);
            yield this.rebuildPlaylist();
        });
    }
    changeTrack(step) {
        if (this.currentTrackIndex + step < 0)
            this.currentTrackIndex = this.playlist.length - 1;
        else if (this.currentTrackIndex + step >= this.playlist.length)
            this.currentTrackIndex = 0;
        else
            this.currentTrackIndex = this.currentTrackIndex + step;
    }
    addTracks(newTracks) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newTracks.length > 0) {
                for (let i = 0; i < newTracks.length; i++) {
                    yield this.addTrack(newTracks[i]);
                }
            }
        });
    }
    addTrack(track) {
        return __awaiter(this, void 0, void 0, function* () {
            this.playlist.push({
                id: this.playlist.length,
                name: track.name,
                path: track.path,
                duration: yield this.getDuration(track)
            });
        });
    }
    getCurrentTrackIndex() {
        return this.currentTrackIndex;
    }
    // public removeTrack(index: number, count: number): boolean {
    //     if(!this.playlistIsEmpty(this.playlist)) return false;
    //     if (this.hasTrackByIndex(index)) {
    //         this.playlist.splice(index, count);
    //         return true;
    //     }
    //     return false;
    // }
    setCurrentTrackIndex(trackIndex) {
        if (this.hasTrackByIndex(trackIndex)) {
            console.log(trackIndex);
            this.currentTrackIndex = trackIndex;
        }
    }
    playlistIsEmpty(playlist) {
        return playlist.length > 0;
    }
    hasTrackByIndex(trackIndex) {
        return this.playlist[trackIndex] != undefined;
    }
    getDuration(track) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let audio = document.createElement("audio");
                audio.src = track.path;
                audio.addEventListener('loadedmetadata', () => __awaiter(this, void 0, void 0, function* () {
                    return resolve(audio.duration);
                }));
            });
        });
    }
    rebuildPlaylist() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.playlist.length > 0) {
                let newPlaylist = [];
                for (let i = 0; i < this.playlist.length; i++) {
                    newPlaylist.push({
                        id: newPlaylist.length,
                        name: this.playlist[i].name,
                        path: this.playlist[i].path,
                        duration: yield this.getDuration(this.playlist[i])
                    });
                }
                this.playlist = newPlaylist;
            }
        });
    }
}
exports.default = Playlist;
