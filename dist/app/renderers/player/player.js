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
class Player {
    constructor(playlist, audio, display, storage) {
        this.playlist = playlist;
        this.audio = audio;
        this.display = display;
        this.storage = storage;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.display.setVolume(this.audio.getVolume());
            this.playlist.loadPlaylist(this.storage.get('playlist'));
            if (this.playlist.getPlaylist().length <= 0) {
                this.display.clearTrackInfo();
                this.display.clearPlaylist();
                return this.display.control.hide();
            }
            yield this.audio.load(this.playlist.getCurrentTrack());
            this.display.renderPlaylist(this.playlist.getPlaylist(), this.playlist.getCurrentTrackIndex());
            this.display.renderTrackInfo(this.playlist.getCurrentTrack());
            yield this.display.pause();
            this.display.control.show();
        });
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.display.renderTrackInfo(this.playlist.getCurrentTrack());
            if (!this.audio.isPlay) {
                yield this.audio.play();
                yield this.display.play();
            }
            else {
                yield this.audio.pause();
                yield this.display.pause();
            }
        });
    }
    prev() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.audio.pause();
            this.playlist.changeTrack(-1);
            const track = this.playlist.getCurrentTrack();
            yield this.audio.load(track);
            yield this.play();
            this.display.renderTrackInfo(track);
            this.display.renderPlaylist(this.playlist.getPlaylist(), track.id);
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.audio.pause();
            this.playlist.changeTrack(1);
            const track = this.playlist.getCurrentTrack();
            yield this.audio.load(track);
            yield this.play();
            this.display.renderTrackInfo(track);
            this.display.renderPlaylist(this.playlist.getPlaylist(), track.id);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    progressBar(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTime = this.display.getClickedTimeFromProgressBar(event, this.playlist.getCurrentTrack().duration);
            yield this.audio.setCurrentTime(currentTime);
            if (!this.audio.isPlay)
                yield this.play();
        });
    }
    dropZoneAddTracks(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            // @ts-ignore
            const newTracks = event.dataTransfer.files;
            let initNeeded = false;
            if (this.playlist.getPlaylist().length <= 0)
                initNeeded = true;
            //add track to playlist
            yield this.playlist.addTracks(newTracks);
            //save playlist to storage
            yield this.storage.savePlaylist(this.playlist.getPlaylist());
            //update playlist on display
            this.display.renderPlaylist(this.playlist.getPlaylist(), this.playlist.getCurrentTrackIndex());
            if (initNeeded)
                return this.init();
        });
    }
    playFromPlaylist(trackIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(trackIndex))
                return;
            yield this.audio.pause();
            this.playlist.setCurrentTrackIndex(trackIndex);
            const track = this.playlist.getCurrentTrack();
            yield this.audio.load(track);
            yield this.play();
            this.display.renderTrackInfo(track);
            this.display.renderPlaylist(this.playlist.getPlaylist(), track.id);
        });
    }
    deleteTrackRightClick(event, trackIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(trackIndex))
                return;
            event.preventDefault();
            if (trackIndex == this.playlist.getCurrentTrackIndex()) {
                yield this.playlist.deleteTrackByIndex(trackIndex);
                if (!this.playlist.playlistIsEmpty(this.playlist.getPlaylist())) {
                    yield this.storage.savePlaylist(this.playlist.getPlaylist());
                    yield this.audio.pause();
                    return this.init();
                }
                yield this.audio.pause();
                this.playlist.changeTrack(0);
                const track = this.playlist.getCurrentTrack();
                yield this.audio.load(track);
                yield this.play();
                this.display.renderTrackInfo(track);
            }
            else if (trackIndex < this.playlist.getCurrentTrackIndex()) {
                yield this.playlist.deleteTrackByIndex(trackIndex);
                this.playlist.changeTrack(-1);
            }
            else if (trackIndex > this.playlist.getCurrentTrackIndex()) {
                yield this.playlist.deleteTrackByIndex(trackIndex);
            }
            yield this.storage.savePlaylist(this.playlist.getPlaylist());
            this.display.renderPlaylist(this.playlist.getPlaylist(), this.playlist.getCurrentTrackIndex());
        });
    }
    setVolume(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const volume = event.target.value;
            yield this.audio.setVolume(volume);
            this.display.setVolume(volume);
        });
    }
}
exports.default = Player;
