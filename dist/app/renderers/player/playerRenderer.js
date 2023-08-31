"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElements_1 = __importDefault(require("./HTMLElements"));
const player_1 = __importDefault(require("./player"));
const playlist_1 = __importDefault(require("./playlist"));
const storage_1 = __importDefault(require("./storage"));
const audio_1 = __importDefault(require("./audio"));
const display_1 = __importDefault(require("./display"));
const windowControl_1 = __importDefault(require("./windowControl"));
const electron_1 = require("electron");
window.addEventListener('DOMContentLoaded', () => {
    const storage = new storage_1.default();
    const htmlElements = new HTMLElements_1.default();
    const windowControl = new windowControl_1.default(htmlElements);
    const audio = new audio_1.default(htmlElements);
    const display = new display_1.default(htmlElements);
    const playlist = new playlist_1.default(storage.get('playlist'));
    const player = new player_1.default(playlist, audio, display, storage);
    electron_1.ipcRenderer.on("playerRenderer", (event, args) => {
        console.log('Main process');
    });
    //Player buttons
    htmlElements.play.addEventListener('click', event => player.play());
    htmlElements.prev.addEventListener('click', event => player.prev());
    htmlElements.next.addEventListener('click', event => player.next());
    htmlElements.stop.addEventListener('click', event => player.stop());
    //Player progress bar
    htmlElements.progress_bar_container.addEventListener('click', event => player.progressBar(event));
    //Player drop zone
    htmlElements.player.addEventListener('dragover', event => display.highlightDropZone(event));
    htmlElements.player.addEventListener('dragenter', event => display.highlightDropZone(event));
    htmlElements.player.addEventListener('dragleave', event => display.unHighlightDropZone(event));
    htmlElements.player.addEventListener('drop', event => player.dropZoneAddTracks(event));
    htmlElements.player.addEventListener('drop', event => display.unHighlightDropZone(event));
    //Audio
    htmlElements.audio.addEventListener('ended', event => player.next());
    //Volume
    htmlElements.volume_input.addEventListener('input', event => player.setVolume(event));
    //Playlist
    // @ts-ignore
    htmlElements.playlist.addEventListener('click', (event) => player.playFromPlaylist(Number(event.target.parentNode.dataset.id)));
    // @ts-ignore
    htmlElements.playlist.addEventListener('contextmenu', (event) => player.deleteTrackRightClick(event, Number(event.target.parentNode.dataset.id)));
    //Window Controls
    htmlElements.btn_close.addEventListener('click', () => windowControl.close());
    htmlElements.btn_min.addEventListener('click', () => windowControl.min());
    window.addEventListener('blur', () => windowControl.blur());
    window.addEventListener('focus', () => windowControl.focus());
});
