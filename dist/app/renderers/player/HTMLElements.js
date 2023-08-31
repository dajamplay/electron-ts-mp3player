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
class HTMLElements {
    constructor() {
        this.player = document.querySelector('.player');
        this.audio = document.querySelector('.audio');
        this.name = document.querySelector('.name');
        this.progress_bar = document.querySelector('.progress_bar');
        this.progress_bar_container = document.querySelector('.progress_container');
        this.play = document.querySelector('.play');
        this.next = document.querySelector('.next');
        this.prev = document.querySelector('.prev');
        this.stop = document.querySelector('.stop');
        this.playlist = document.querySelector('.playlist');
        this.time_current = document.querySelector('.time_current');
        this.time_end = document.querySelector('.time_end');
        this.btn_close = document.querySelector('#btn_close');
        this.btn_max = document.querySelector('#btn_max');
        this.btn_min = document.querySelector('#btn_min');
        this.title = document.querySelector('.title');
        this.volume_percent = document.querySelector('.volume_percent');
        this.title_bar_wrapper = document.querySelector('.title_bar_wrapper');
        this.volume_input = document.querySelector('#volume_input');
    }
    getCurrentTrackHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield document.querySelector('.current_track');
        });
    }
}
exports.default = HTMLElements;
