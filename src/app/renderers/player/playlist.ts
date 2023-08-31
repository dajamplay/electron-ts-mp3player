import Track from './track'

export default class Playlist {

    private playlist: Track[] = [];
    private currentTrackIndex: number = 0;

    public constructor(playlist: Track[]) {
        this.loadPlaylist(playlist);
    }

    public loadPlaylist(playlist: Track[]): boolean {
        if (playlist.length > 0) {
            this.playlist = playlist;
            this.currentTrackIndex = 0;
            return true;
        }
        return false;
    }

    public getPlaylist(): Track[] {
        return this.playlist;
    }

    public getCurrentTrack(): Track {
        return this.playlist[this.currentTrackIndex];
    }

    public async deleteTrackByIndex(index: number) {
        this.playlist.splice(index, 1);
        await this.rebuildPlaylist();
    }

    public changeTrack(step: number) {
        if (this.currentTrackIndex + step < 0)  this.currentTrackIndex = this.playlist.length - 1;
        else if (this.currentTrackIndex + step >= this.playlist.length)  this.currentTrackIndex = 0;
        else this.currentTrackIndex = this.currentTrackIndex + step;

    }

    public async addTracks(newTracks: Track[]) {
        if (newTracks.length > 0) {
            for (let i = 0; i < newTracks.length; i++) {
                await this.addTrack(newTracks[i]);
            }
        }
    }

    public async addTrack(track: Track) {
        this.playlist.push({
            id: this.playlist.length,
            name: track.name,
            path: track.path,
            duration: await this.getDuration(track)
        });
    }

    public getCurrentTrackIndex() {
        return this.currentTrackIndex;
    }

    // public removeTrack(index: number, count: number): boolean {
    //     if(!this.playlistIsEmpty(this.playlist)) return false;
    //     if (this.hasTrackByIndex(index)) {
    //         this.playlist.splice(index, count);
    //         return true;
    //     }
    //     return false;
    // }

    public setCurrentTrackIndex(trackIndex: number): void {
        if (this.hasTrackByIndex(trackIndex)) {
            console.log(trackIndex)
            this.currentTrackIndex = trackIndex;
        }
    }

    public playlistIsEmpty(playlist: Track[]): boolean {
        return playlist.length > 0;
    }

    private hasTrackByIndex(trackIndex: number): boolean {
        return this.playlist[trackIndex] != undefined;
    }

    private async getDuration(track: Track) {
        return new Promise<number>((resolve, reject) => {
            let audio: any = document.createElement("audio");
            audio.src = track.path;
            audio.addEventListener('loadedmetadata', async () => {
                return resolve(audio.duration)
            })
        });
    }

    private async rebuildPlaylist() {
        if (this.playlist.length > 0) {
            let newPlaylist = [];
            for (let i = 0; i < this.playlist.length; i++) {
                newPlaylist.push({
                    id: newPlaylist.length,
                    name: this.playlist[i].name,
                    path: this.playlist[i].path,
                    duration: await this.getDuration(this.playlist[i])
                });
            }
            this.playlist = newPlaylist;
        }
    }
}