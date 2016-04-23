/// <reference path="../../references.ts" />
/**
 * Creates a SoundEffect object
 *
 * @class
 */
class SoundEffect {
    /**
     * The file path
     *
     * @property src
     * @type string
     */
    src: string;
    /**
     * Stores all instances
     *
     * @property instances
     * @type Array
     * @private
     */
    private instances: HTMLAudioElement[] = [];
    /**
     * The volume of the sound effect
     *
     * @property _volume
     * @type number
     * @private
     */
    private _volume: number = 1;
    get volume(): number {
        return this._volume;
    }
    set volume(volume: number) {
        this._volume = volume;
        // Set volume of any active instances
        this.applyToAllInstances(function(instance) {
            instance.volume = volume;
        });
    }
    /**
     * Declares if the sound effect is muted or not
     *
     * @property _muted
     * @type boolean
     * @private
     */
    private _muted: boolean = false;
    get muted(): boolean {
        return this._muted;
    }
    set muted(muted: boolean) {
        this._muted = muted;
        // Set muted of any active instances
        this.applyToAllInstances(function(instance) {
            instance.muted = muted;
        });
    }
    /**
     * @constructor
     */
    constructor(src: string) {
        this.src = src;
    }
    /**
     * Creates a new instance of the audio track and plays it.
     * Once the audio has finished playing it is removed.
     * This allows overlap in sounds that may need to be played
     * more than once at the same time.
     * 
     * @method play()
     */
    play() {
        let len = this.instances.length - 1;
        this.instances.push(new Audio(this.src));
        this.instances[len + 1].volume = this._volume;
        this.instances[len + 1].muted = this._muted;
        this.instances[len + 1].play();
        // Capture the object
        let _this = this;
        // Remove instance when done
        this.instances[len + 1].onended = function() {
            _this.instances.splice(len + 1, 1);
        }
    }
    /**
     * Executes a function on all instances
     * 
     * @method applyToAllInstances()
     * @param {function} func A function
     * @private
     */
    private applyToAllInstances(func) {
        if (this.instances.length > 0) {
            for (let i = 0; i < this.instances.length; i++) {
                func(this.instances[i]);
            }
        }
    }
}