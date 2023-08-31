export default class HTMLElements {
    public player: Element;
    public audio: HTMLAudioElement;
    public playlist: HTMLDivElement;
    public name: HTMLDivElement;
    public progress_bar: HTMLDivElement;
    public progress_bar_container: HTMLDivElement;
    public play: HTMLButtonElement;
    public next: HTMLButtonElement;
    public prev: HTMLButtonElement;
    public stop: HTMLButtonElement;
    public time_current: HTMLDivElement;
    public time_end: HTMLDivElement;
    public btn_close: HTMLButtonElement;
    public btn_max: HTMLButtonElement;
    public btn_min: HTMLButtonElement;
    public title: HTMLDivElement;
    public volume_percent: HTMLDivElement;
    public title_bar_wrapper: HTMLDivElement;
    public volume_input: HTMLInputElement;

    constructor() {
        this.player = document.querySelector('.player') as HTMLDivElement;
        this.audio = document.querySelector('.audio') as HTMLAudioElement;
        this.name = document.querySelector('.name') as HTMLDivElement;
        this.progress_bar = document.querySelector('.progress_bar') as HTMLDivElement;
        this.progress_bar_container = document.querySelector('.progress_container') as HTMLDivElement;
        this.play = document.querySelector('.play') as HTMLButtonElement;
        this.next = document.querySelector('.next') as HTMLButtonElement;
        this.prev = document.querySelector('.prev') as HTMLButtonElement;
        this.stop = document.querySelector('.stop') as HTMLButtonElement;
        this.playlist = document.querySelector('.playlist') as HTMLDivElement;
        this.time_current = document.querySelector('.time_current') as HTMLDivElement;
        this.time_end = document.querySelector('.time_end') as HTMLDivElement
        this.btn_close = document.querySelector('#btn_close') as HTMLButtonElement;
        this.btn_max = document.querySelector('#btn_max') as HTMLButtonElement;
        this.btn_min = document.querySelector('#btn_min') as HTMLButtonElement;
        this.title = document.querySelector('.title') as HTMLDivElement;
        this.volume_percent = document.querySelector('.volume_percent') as HTMLDivElement;
        this.title_bar_wrapper = document.querySelector('.title_bar_wrapper') as HTMLDivElement;
        this.volume_input = document.querySelector('#volume_input') as HTMLInputElement;
    }

    public async getCurrentTrackHtml() {
        return await document.querySelector('.current_track') as HTMLDivElement;
    }
}