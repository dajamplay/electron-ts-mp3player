import Playlist from './playlist'
import Display from './display'
import Audio from './audio'
import Storage from './storage'
import Track from "./track";

export default class Player {

    private playlist: Playlist;
    private audio: Audio;
    private display: Display;
    private storage: Storage;

    constructor(playlist: Playlist, audio: Audio, display: Display, storage: Storage) {
        this.playlist = playlist
        this.audio = audio
        this.display = display
        this.storage = storage
        this.init()
    }

    async init() {
        this.display.setVolume(this.audio.getVolume());
        this.playlist.loadPlaylist(this.storage.get('playlist'))

        if (this.playlist.getPlaylist().length <= 0) {
            this.display.clearTrackInfo();
            this.display.clearPlaylist();
            return this.display.control.hide();
        }

        await this.audio.load(this.playlist.getCurrentTrack())

        this.display.renderPlaylist(this.playlist.getPlaylist(), this.playlist.getCurrentTrackIndex())
        this.display.renderTrackInfo(this.playlist.getCurrentTrack())
        await this.display.pause()
        this.display.control.show()
    }

    async play() {
        this.display.renderTrackInfo(this.playlist.getCurrentTrack())

        if (!this.audio.isPlay) {
            await this.audio.play()
            await this.display.play()
        } else {
            await this.audio.pause()
            await this.display.pause()
        }

    }

    async prev() {
        await this.audio.pause()
        this.playlist.changeTrack(-1);
        const track = this.playlist.getCurrentTrack()
        await this.audio.load(track)
        await this.play()
        this.display.renderTrackInfo(track);
        this.display.renderPlaylist(this.playlist.getPlaylist(), track.id);
    }

    async next() {
        await this.audio.pause()
        this.playlist.changeTrack(1);
        const track = this.playlist.getCurrentTrack()
        await this.audio.load(track)
        await this.play()
        this.display.renderTrackInfo(track);
        this.display.renderPlaylist(this.playlist.getPlaylist(), track.id);
    }

    async stop() {

    }

    async progressBar(event: MouseEvent) {
        const currentTime = this.display.getClickedTimeFromProgressBar(event, this.playlist.getCurrentTrack().duration);
        await this.audio.setCurrentTime(currentTime);
        if (!this.audio.isPlay) await this.play()
    }

    async dropZoneAddTracks(event: Event) {
        event.preventDefault();
        // @ts-ignore
        const newTracks: Track[] = event.dataTransfer.files;

        let initNeeded = false;
        if (this.playlist.getPlaylist().length <= 0) initNeeded = true;

        //add track to playlist
        await this.playlist.addTracks(newTracks);

        //save playlist to storage
        await this.storage.savePlaylist(this.playlist.getPlaylist());

        //update playlist on display
        this.display.renderPlaylist(this.playlist.getPlaylist(), this.playlist.getCurrentTrackIndex());

        if (initNeeded) return this.init();
    }

    async playFromPlaylist(trackIndex: number) {
        if (isNaN(trackIndex)) return;
        await this.audio.pause();

        this.playlist.setCurrentTrackIndex(trackIndex);
        const track = this.playlist.getCurrentTrack();
        await this.audio.load(track);
        await this.play();
        this.display.renderTrackInfo(track);
        this.display.renderPlaylist(this.playlist.getPlaylist(), track.id);
    }

    async deleteTrackRightClick(event: MouseEvent, trackIndex: number) {
        if (isNaN(trackIndex)) return;
        event.preventDefault();
        if (trackIndex == this.playlist.getCurrentTrackIndex()) {
            await this.playlist.deleteTrackByIndex(trackIndex);
            if (!this.playlist.playlistIsEmpty(this.playlist.getPlaylist())) {
                await this.storage.savePlaylist(this.playlist.getPlaylist());
                await this.audio.pause();
                return this.init();
            }
            await this.audio.pause()
            this.playlist.changeTrack(0);
            const track = this.playlist.getCurrentTrack()
            await this.audio.load(track)
            await this.play()
            this.display.renderTrackInfo(track);
        } else if(trackIndex < this.playlist.getCurrentTrackIndex()) {
            await this.playlist.deleteTrackByIndex(trackIndex);
            this.playlist.changeTrack(-1);
        } else if(trackIndex > this.playlist.getCurrentTrackIndex()) {
            await this.playlist.deleteTrackByIndex(trackIndex);
        }
        await this.storage.savePlaylist(this.playlist.getPlaylist());
        this.display.renderPlaylist(this.playlist.getPlaylist(), this.playlist.getCurrentTrackIndex());
    }

    public async setVolume(event: any) {
        const volume = event.target.value;
        await this.audio.setVolume(volume);
        this.display.setVolume(volume);
    }
}