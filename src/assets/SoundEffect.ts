/// <reference path="../../references.ts" />
/**
 * Creates a SoundEffect object
 *
 * @class
 */
class SoundEffect {
    /**
     * The file path of the sound effect
     *
     * @property location
     * @type string
     */
    location: string;
    /**
     * The file path of the sound effect
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
    }
    /**
     * Stores all instances of the sound effect
     *
     * @property instances
     * @type Array
     */
    instances: HTMLAudioElement[]=[];
    /**
     * @constructor
     */
    constructor(location: string) {
        this.location = location;
        this.instances[0] = new Audio(location);
        console.log(this.instances.length);
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
        this.instances.push(new Audio(this.location));
        this.instances[len + 1].volume = this._volume;
        this.instances[len + 1].play();
        // Capture the object
        var _this = this;
        // Remove instance when done
        this.instances[len + 1].onended = function() {
            _this.instances.splice(len + 1, 1);
        }
    }
}