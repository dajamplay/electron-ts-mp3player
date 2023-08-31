import HTMLElements from "./HTMLElements";
import {ipcRenderer} from "electron";

export default class WindowControl {

    private htmlElements: HTMLElements;

    constructor(htmlElements: HTMLElements) {
        this.htmlElements = htmlElements
    }

    close() {
        ipcRenderer.send( 'playerWindow', {
            action: 'closeWindow'
        })
    }

    min() {
        ipcRenderer.send( 'playerWindow', {
            action: 'minWindow'
        })
    }

    blur() {
        this.htmlElements.title_bar_wrapper.classList.add('blur')
    }

    focus() {
        this.htmlElements.title_bar_wrapper.classList.remove('blur')
    }
}

module.exports = WindowControl