import HTMLElements from "./HTMLElements";
import Track from './track'

export default class Display {

    private htmlElements: HTMLElements;
    private html_time_current: any;

    constructor(htmlElements: HTMLElements) {
        this.htmlElements = htmlElements
    }

    public clearPlaylist() {
        this.htmlElements.playlist.innerHTML = "";
    }

    public clearTrackInfo() {
        this.htmlElements.play.classList.remove('play');
        this.htmlElements.play.classList.add('pause');
        this.setTrackName("Нет трека");
        this.setTrackDuration(0);
    }

    public renderPlaylist(tracks: Track[], currentTrackIndex: number): void {
        this.htmlElements.playlist.innerHTML = ""
        for (let i = 0; i < tracks.length ; i++) {
            let html = "";
            if (i == currentTrackIndex) {
                html += `<div class="track current_track" data-id="${i}">`;
            } else {
                html += `<div class="track" data-id="${i}">`;
            }
            html += `<div class="track_number">${tracks[i].id + 1}</div>`;
            html += `<div class="track_name">${tracks[i].name}</div>`;
            html += `<div class="track_duration">${this.secondToTime(tracks[i].duration)}</div>`;
            html += `</div>`;
            this.htmlElements.playlist.innerHTML += html;
        }
    }

    public renderTrackInfo(track: Track): void {
        this.setTrackName(track.name);
        this.setTrackDuration(track.duration);
    }

    public async play() {
        this.htmlElements.play.classList.add('play')
        this.htmlElements.play.classList.remove('pause')
        this.htmlElements.progress_bar.classList.add('progress_bar_animate')
        let currentTrackHtml = await this.htmlElements.getCurrentTrackHtml();
        currentTrackHtml.classList.add('progress_bar_animate');
        this.htmlElements.time_end.innerHTML = this.secondToTime(this.htmlElements.audio.duration).toString()
        this.html_time_current = window.setInterval( () => {
            this.htmlElements.progress_bar.style.width = ((this.htmlElements.audio.currentTime / this.htmlElements.audio.duration)*100).toString() + '%';
            this.htmlElements.time_current.innerHTML = this.secondToTime(this.htmlElements.audio.currentTime).toString()
        }, 100)
    }

    public async pause() {
        this.htmlElements.play.classList.remove('play')
        this.htmlElements.play.classList.add('pause')
        this.htmlElements.progress_bar.classList.remove('progress_bar_animate')
        let currentTrackHtml = await this.htmlElements.getCurrentTrackHtml();
        currentTrackHtml.classList.remove('progress_bar_animate');
        if (this.html_time_current) clearInterval(this.html_time_current)
    }

    public setVolume(value: number) {
        this.htmlElements.volume_percent.innerHTML = `${Math.floor(value * 100)}%`;
    }

    public getClickedTimeFromProgressBar(event: MouseEvent, duration: number): number {
        const width = this.htmlElements.progress_bar_container.clientWidth;
        const clickX = event.offsetX;
        return (clickX / width) * duration;
    }

    public control = {
        show: () => {
            this.htmlElements.play.removeAttribute('disabled')
            this.htmlElements.prev.removeAttribute('disabled')
            this.htmlElements.next.removeAttribute('disabled')
            this.htmlElements.stop.removeAttribute('disabled')
            this.htmlElements.progress_bar_container.classList.remove('click_disable')
        },
        hide: () => {
            this.htmlElements.play.setAttribute('disabled', '1')
            this.htmlElements.prev.setAttribute('disabled', '1')
            this.htmlElements.next.setAttribute('disabled', '1')
            this.htmlElements.stop.setAttribute('disabled', '1')
            this.htmlElements.progress_bar_container.classList.add('click_disable')
        }
    }

    public highlightDropZone(event: Event) {
        event.preventDefault()
        this.htmlElements.player.classList.add('drop')
    }

    public unHighlightDropZone(event: Event) {
        event.preventDefault()
        this.htmlElements.player.classList.remove('drop')
    }

    private secondToTime(seconds: number) {
        // @ts-ignore
        let date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }

    private setTrackName(name: string) {
        this.htmlElements.name.innerHTML = name;
    }

    private setTrackDuration(duration: number) {
        this.htmlElements.time_end.innerHTML = this.secondToTime(duration);
    }
}