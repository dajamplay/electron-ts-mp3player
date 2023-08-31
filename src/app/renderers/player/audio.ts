import HtmlElements from './HTMLElements'

export default class Audio {
    private audio: HTMLAudioElement;
    public isPlay: boolean;

    constructor(htmlElements: HtmlElements) {
        this.audio = htmlElements.audio;
        this.isPlay = false;
        this.audio.volume = 0.5;
    }

    public async setCurrentTime(time: number) {
        this.audio.currentTime = time
    }

    public getVolume() {
        return this.audio.volume;
    }

    public async getCurrentTime() {
        return this.audio.currentTime
    }

    public async pause() {
        this.isPlay = false
        await this.audio.pause()
    }

    public async play() {
        this.isPlay = true
        await this.audio.play()
    }

    public async load(track: any) {
        this.audio.src = await track.path
    }

    public async getDuration() {
        return this.audio.duration
    }

    public async stop() {
        this.isPlay = false
        await this.audio.pause()
        this.audio.currentTime = 0
    }

    public async setVolume(value: number) {
        this.audio.volume = value;
    }
}
