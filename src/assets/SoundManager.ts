/// <reference path="../../references.ts" />
/**
 * Creates a SoundManager object
 *
 * @class SoundManager
 */
class SoundManager {
    /**
     * An array of SoundEffect objects.
     *
     * @property soundEffects
     * @type Array
     */
    soundEffects: SoundEffect[] = [];
    /**
     * An array of Soundtrack objects.
     *
     * @property soundtracks
     * @type Array
     */
    soundtracks: Soundtrack[] = [];
    /**
     * @constructor
     */
    constructor() {}
    /**
     * Adds either a sound effect or soundtrack to the manager
     *
     * @method add()
     */
    add(soundEffect: SoundEffect);
    add(soundtrack: Soundtrack);
    add(obj: any) {
        if(obj instanceof SoundEffect) {
            this.soundEffects.push(obj);
        } else if(obj instanceof Soundtrack) {
            this.soundtracks.push(obj);
        }
    }
    /**
     * Removes either a sound effect or soundtrack from the manager
     *
     * @method remove()
     */
    remove(soundEffect: SoundEffect);
    remove(soundtrack: Soundtrack);
    remove(obj: any) {
        if (obj instanceof SoundEffect) {
            this.soundEffects.splice(this.soundEffects.indexOf(obj), 1);
        } else if (obj instanceof Soundtrack) {
            this.soundtracks.splice(this.soundtracks.indexOf(obj), 1);
        }
    }
    /**
     * Sets the volume to all sound effects and soundtracks
     *
     * @method setVolumeAll()
     * @param {number} volume A volume amount between 0 and 1
     */
    setVolumeAll(volume: number) {
        this.setVolumeSoundEffects(volume);
        this.setVolumeSoundEffects(volume);
    }
    /**
     * Sets the volume to just the sound effects
     *
     * @method setVolumeSoundEffects()
     * @param {number} volume A volume amount between 0 and 1
     */
    setVolumeSoundEffects(volume: number) {
        this.applyToArray(this.soundEffects, function(item) {
            item.volume = volume;
        });
    }
    /**
     * Sets the volume to just the soundtracks
     *
     * @method setVolumeSoundtracks()
     * @param {number} volume A volume amount between 0 and 1
     */
    setVolumeSoundtracks(volume: number) {
        this.applyToArray(this.soundtracks, function(item) {
            item.volume = volume;
        });
    }
    /**
     * Mutes/unmutes all sound effects and soundtracks
     *
     * @method setMutedAll()
     * @param {boolean} muted Should the sound be muted
     */
    setMutedAll(muted: boolean) {
        this.setMutedSoundEffects(muted);
        this.setMutedSoundtracks(muted);
    }
    /**
     * Mutes/unmutes just the sound effects
     *
     * @method setMutedSoundEffects()
     * @param {boolean} muted Should the sound be muted
     */
    setMutedSoundEffects(muted: boolean) {
        this.applyToArray(this.soundEffects, function(item) {
            item.muted = muted;
        });
    }
    /**
     * Mutes/unmutes just the soundtracks
     *
     * @method setMutedSoundtracks()
     * @param {boolean} muted Should the sound be muted
     */
    setMutedSoundtracks(muted: boolean) {
        this.applyToArray(this.soundtracks, function(item) {
            item.muted = muted;
        });
    }
    /**
     * Executes a function on all elements of an array
     * 
     * @method applyToArray()
     * @param {Array} array An array
     * @param {function} func A function
     * @private
     */
    private applyToArray(array: any, func: any) {
        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                func(array[i]);
            }
        }
    }
}