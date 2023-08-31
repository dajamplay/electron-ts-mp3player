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
class Audio {
    constructor(htmlElements) {
        this.audio = htmlElements.audio;
        this.isPlay = false;
        this.audio.volume = 0.5;
    }
    setCurrentTime(time) {
        return __awaiter(this, void 0, void 0, function* () {
            this.audio.currentTime = time;
        });
    }
    getVolume() {
        return this.audio.volume;
    }
    getCurrentTime() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.audio.currentTime;
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isPlay = false;
            yield this.audio.pause();
        });
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isPlay = true;
            yield this.audio.play();
        });
    }
    load(track) {
        return __awaiter(this, void 0, void 0, function* () {
            this.audio.src = yield track.path;
        });
    }
    getDuration() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.audio.duration;
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isPlay = false;
            yield this.audio.pause();
            this.audio.currentTime = 0;
        });
    }
    setVolume(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.audio.volume = value;
        });
    }
}
exports.default = Audio;
