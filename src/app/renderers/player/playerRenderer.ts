import HTMLElements from "./HTMLElements";
import Player from "./player";
import Playlist from "./playlist";
import Storage from "./storage";
import Audio from "./audio";
import Display from "./display";
import WindowControl from "./windowControl";
import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {

    const storage: Storage = new Storage()
    const htmlElements: HTMLElements = new HTMLElements()
    const windowControl: WindowControl = new WindowControl(htmlElements)
    const audio: Audio = new Audio(htmlElements)
    const display: Display = new Display(htmlElements)
    const playlist: Playlist = new Playlist(storage.get('playlist'))
    const player: Player = new Player(playlist, audio, display, storage)

    ipcRenderer.on("playerRenderer", (event, args) => {
        console.log('Main process')
    })

    //Player buttons
    htmlElements.play.addEventListener('click', event => player.play())
    htmlElements.prev.addEventListener('click', event => player.prev())
    htmlElements.next.addEventListener('click', event => player.next())
    htmlElements.stop.addEventListener('click', event => player.stop())

    //Player progress bar
    htmlElements.progress_bar_container.addEventListener('click', event => player.progressBar(event))

    //Player drop zone
    htmlElements.player.addEventListener('dragover', event => display.highlightDropZone(event))
    htmlElements.player.addEventListener('dragenter', event => display.highlightDropZone(event))
    htmlElements.player.addEventListener('dragleave', event => display.unHighlightDropZone(event))
    htmlElements.player.addEventListener('drop', event => player.dropZoneAddTracks(event))
    htmlElements.player.addEventListener('drop', event => display.unHighlightDropZone(event))

    //Audio
    htmlElements.audio.addEventListener('ended', event => player.next())

    //Volume
    htmlElements.volume_input.addEventListener('input', event => player.setVolume(event))

    //Playlist
    // @ts-ignore
    htmlElements.playlist.addEventListener('click', (event) => player.playFromPlaylist(Number(event.target.parentNode.dataset.id)))
    // @ts-ignore
    htmlElements.playlist.addEventListener('contextmenu', (event) => player.deleteTrackRightClick(event, Number(event.target.parentNode.dataset.id)))

    //Window Controls
    htmlElements.btn_close.addEventListener('click', () => windowControl.close())
    htmlElements.btn_min.addEventListener('click', () => windowControl.min())
    window.addEventListener('blur', () => windowControl.blur())
    window.addEventListener('focus', () => windowControl.focus())
})

