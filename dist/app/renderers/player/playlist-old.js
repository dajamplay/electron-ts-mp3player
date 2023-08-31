"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const track_1 = __importDefault(require("./track"));
class Playlist {
    constructor() {
        this.playlist = [];
        this.playingTrackIndex = 0;
    }
    load(playlist) {
        this.playlist = playlist;
    }
    getPlayingTrack() {
        return this.playlist[this.playingTrackIndex];
    }
    getPlayList() {
        return this.playlist;
    }
    getPlayingTrackIndex() {
        var _a;
        return (_a = this.playingTrackIndex) !== null && _a !== void 0 ? _a : 0;
    }
    addLoadedTracks(loadedPlaylist) {
        let offsetIndex = this.playlist.length;
        if (loadedPlaylist && loadedPlaylist.length > 0) {
            for (let i = offsetIndex; i < loadedPlaylist.length + offsetIndex; i++)
                this.addLoadedTrack(this.playlist, loadedPlaylist[i - offsetIndex], i);
        }
    }
    addLoadedTrack(playlist, track, id) {
        playlist.push(new track_1.default(track.name, track.path, id));
    }
    IsEmpty() {
        return this.playlist && this.playlist.length <= 0;
    }
    trackByIndex(index) {
        return this.playlist[this.playingTrackIndex = index];
    }
    nextTrack() {
        if (this.playingTrackIndex + 1 < this.playlist.length) {
            return this.playlist[++this.playingTrackIndex];
        }
        else {
            this.playingTrackIndex = 0;
            return this.playlist[this.playingTrackIndex];
        }
    }
    prevTrack() {
        return this.playingTrackIndex > 0 ? this.playlist[--this.playingTrackIndex] : this.playlist[this.playingTrackIndex = this.playlist.length - 1];
    }
}
exports.default = Playlist;
