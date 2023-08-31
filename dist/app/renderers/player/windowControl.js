"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class WindowControl {
    constructor(htmlElements) {
        this.htmlElements = htmlElements;
    }
    close() {
        electron_1.ipcRenderer.send('playerWindow', {
            action: 'closeWindow'
        });
    }
    min() {
        electron_1.ipcRenderer.send('playerWindow', {
            action: 'minWindow'
        });
    }
    blur() {
        this.htmlElements.title_bar_wrapper.classList.add('blur');
    }
    focus() {
        this.htmlElements.title_bar_wrapper.classList.remove('blur');
    }
}
exports.default = WindowControl;
module.exports = WindowControl;
