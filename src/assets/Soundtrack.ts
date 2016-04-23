/**
 * Creates a Soundtrack object
 *
 * @class Soundtrack
 */
class Soundtrack{
    /**
     * Stores the soundtrack
     *
     * @property track
     * @type HTMLAudioElement
     * @private
     */
    private track: HTMLAudioElement;
    get volume(): number {
        return this.track.volume;
    }
    set volume(volume: number) {
        this.track.volume = volume;
    }
    get muted(): boolean {
        return this.track.muted;
    }
    set muted(muted: boolean) {
        this.track.muted = muted;
    }
    get src(): string {
        return this.track.src;
    }
    set src(src: string) {
        this.track.src = src;
    }
    /**
     * @constructor
     */
    constructor(src: string) {
        this.track = new Audio(src);
        // Apparently loop is not implemented in firefox - 
        // http://stackoverflow.com/questions/3273552/html5-audio-looping
        // this.track.loop = true;
        // Allows the track to loop in all browsers
        this.track.onended = function() {
            this.currentTime = 0;
            this.play();
        }
    }
    /**
     * Wrapper on top of the HTMLAudioElement play() method
     * 
     * @method play()
     */
    play() {
        this.track.play();
    }
    /**
     * Wrapper on top of the HTMLAudioElement pause() method
     * 
     * @method pause()
     */
    pause() {
        this.track.pause();
    }
}