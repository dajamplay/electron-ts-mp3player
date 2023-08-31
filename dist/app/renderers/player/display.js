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
class Display {
    constructor(htmlElements) {
        this.control = {
            show: () => {
                this.htmlElements.play.removeAttribute('disabled');
                this.htmlElements.prev.removeAttribute('disabled');
                this.htmlElements.next.removeAttribute('disabled');
                this.htmlElements.stop.removeAttribute('disabled');
                this.htmlElements.progress_bar_container.classList.remove('click_disable');
            },
            hide: () => {
                this.htmlElements.play.setAttribute('disabled', '1');
                this.htmlElements.prev.setAttribute('disabled', '1');
                this.htmlElements.next.setAttribute('disabled', '1');
                this.htmlElements.stop.setAttribute('disabled', '1');
                this.htmlElements.progress_bar_container.classList.add('click_disable');
            }
        };
        this.htmlElements = htmlElements;
    }
    clearPlaylist() {
        this.htmlElements.playlist.innerHTML = "";
    }
    clearTrackInfo() {
        this.htmlElements.play.classList.remove('play');
        this.htmlElements.play.classList.add('pause');
        this.setTrackName("Нет трека");
        this.setTrackDuration(0);
    }
    renderPlaylist(tracks, currentTrackIndex) {
        this.htmlElements.playlist.innerHTML = "";
        for (let i = 0; i < tracks.length; i++) {
            let html = "";
            if (i == currentTrackIndex) {
                html += `<div class="track current_track" data-id="${i}">`;
            }
            else {
                html += `<div class="track" data-id="${i}">`;
            }
            html += `<div class="track_number">${tracks[i].id + 1}</div>`;
            html += `<div class="track_name">${tracks[i].name}</div>`;
            html += `<div class="track_duration">${this.secondToTime(tracks[i].duration)}</div>`;
            html += `</div>`;
            this.htmlElements.playlist.innerHTML += html;
        }
    }
    renderTrackInfo(track) {
        this.setTrackName(track.name);
        this.setTrackDuration(track.duration);
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.htmlElements.play.classList.add('play');
            this.htmlElements.play.classList.remove('pause');
            this.htmlElements.progress_bar.classList.add('progress_bar_animate');
            let currentTrackHtml = yield this.htmlElements.getCurrentTrackHtml();
            currentTrackHtml.classList.add('progress_bar_animate');
            this.htmlElements.time_end.innerHTML = this.secondToTime(this.htmlElements.audio.duration).toString();
            this.html_time_current = window.setInterval(() => {
                this.htmlElements.progress_bar.style.width = ((this.htmlElements.audio.currentTime / this.htmlElements.audio.duration) * 100).toString() + '%';
                this.htmlElements.time_current.innerHTML = this.secondToTime(this.htmlElements.audio.currentTime).toString();
            }, 100);
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            this.htmlElements.play.classList.remove('play');
            this.htmlElements.play.classList.add('pause');
            this.htmlElements.progress_bar.classList.remove('progress_bar_animate');
            let currentTrackHtml = yield this.htmlElements.getCurrentTrackHtml();
            currentTrackHtml.classList.remove('progress_bar_animate');
            if (this.html_time_current)
                clearInterval(this.html_time_current);
        });
    }
    setVolume(value) {
        this.htmlElements.volume_percent.innerHTML = `${Math.floor(value * 100)}%`;
    }
    getClickedTimeFromProgressBar(event, duration) {
        const width = this.htmlElements.progress_bar_container.clientWidth;
        const clickX = event.offsetX;
        return (clickX / width) * duration;
    }
    highlightDropZone(event) {
        event.preventDefault();
        this.htmlElements.player.classList.add('drop');
    }
    unHighlightDropZone(event) {
        event.preventDefault();
        this.htmlElements.player.classList.remove('drop');
    }
    secondToTime(seconds) {
        // @ts-ignore
        let date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }
    setTrackName(name) {
        this.htmlElements.name.innerHTML = name;
    }
    setTrackDuration(duration) {
        this.htmlElements.time_end.innerHTML = this.secondToTime(duration);
    }
}
exports.default = Display;
