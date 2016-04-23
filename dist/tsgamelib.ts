/// <reference path="../../references.ts" />
/**
 * Creates a SoundEffect object
 *
 * @class SoundEffect
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
    private applyToAllInstances(func: any) {
        if (this.instances.length > 0) {
            for (let i = 0; i < this.instances.length; i++) {
                func(this.instances[i]);
            }
        }
    }
}
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
/// <reference path="../../references.ts" />
/**
 * Creates a Point object
 *
 * @class Point
 */
class Point {
    /**
     * X position
     *
     * @property x
     * @type number
     */
    x: number;
    /**
     * Y position
     *
     * @property y
     * @type number
     */
    y: number;
    /**
     * @constructor
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /**
     * Adds a x and y value to the Point object
     * 
     * @method add()
     */
    add(point: Point): void;
    add(size: Size): void;
    add(x: number, y: number): void;
    add(obj1: any, obj2?: any): void {
        // Is only given a Point
        if (obj1 instanceof Point && obj2 == null) {
            this.addX(obj1.x);
            this.addY(obj1.y);
        }
        // Is only given a Size
        else if (obj1 instanceof Size && obj2 == null) {
            this.addX(obj1.width);
            this.addY(obj1.height);
        }
        // Is given two numbers
        else if(typeof obj1 == "number" && typeof obj2 == "number") {
            this.addX(obj1);
            this.addY(obj2);
        }
    }
    /**
     * Adds a x value to the Point object
     * 
     * @method add()
     */
    addX(x: number): void {
        this.x += x;
    }
    /**
     * Adds a y value to the Point object
     * 
     * @method add()
     */
    addY(y: number): void {
        this.y += y;
    }
}
/// <reference path="../../references.ts" />
/**
 * Creates a Size object
 *
 * @class Size
 */
class Size {
    /**
     * Stores a width
     *
     * @property width
     * @type number
     */
    width: number;
    /**
     * Stores a height
     *
     * @property height
     * @type number
     */
    height: number;
    /**
     * @constructor
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
/// <reference path="../../../references.ts" />
/**
 * Creates a Circle object
 *
 * @class Circle
 */
class Circle {
    /**
     * The position (x and y).
     * The circle position currently goes from the top left of the circle.
     * This is so when it comes to rendering sprites you won't have to offset
     * the radius from the position each time.
     * This may be changed in the future.
     *
     * @property pos
     * @type Point
     */
    pos: Point;
    /**
     * The radius
     *
     * @property radius
     * @type number
     */
    radius: number;
    /**
     * @constructor
     */
    constructor(pos: Point, radius: number) {
        this.pos = pos;
        this.radius = radius;
    }
    /**
     * Returns the center Point of the Circle
     * 
     * @method center()
     * @return {Point}
     */
    center(): Point {
        return new Point(this.pos.x + this.radius, this.pos.y + this.radius);
    }
    /**
     * Returns a boolean, if true means the input is colliding with the Circle
     * 
     * @method collides()
     * @return {boolean}
     */
    collides(rectangle: Rectangle): boolean;
    collides(circle: Circle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, radius: number): boolean;
    collides(obj: any, radius?:number): boolean {
        // Is given a rectangle
        if(obj instanceof Rectangle) {
            return obj.collides(this);
        }
        // Is given a Circle
        else if(obj instanceof Circle) {
            return this.collision(obj.center().x, obj.center().y, obj.radius);
        } 
        // Is given a Point and radius
        else if(obj instanceof Point && radius != null) {
            return this.collision(obj.x + radius, obj.y + radius, radius);
        } 
        // Is only given a Point
        else if (obj instanceof Point) {
            return this.collision(obj.x, obj.y);  
        }
    }
    /**
     * Returns a boolean, if true means either a Point or Circle is colliding 
     * with the Circle
     * 
     * @method collision()
     * @private
     * @return {boolean}
     */
    private collision(x: number, y: number, radius?: number) {
        let r1 = this.radius;
        // Only need second radius for circle on circle collisin
        let r2 = radius != null ? radius : 0;
        let bb = this.center().x - x;
        bb = bb * bb;
        let cc = this.center().y - y;
        cc = cc * cc;
        let d = Math.sqrt(bb + cc);
        // Is colliding
        if (r1 + r2 > d) {
            return true;
        } 
        // Is not colliding
        else {
            return false;
        } 
    }
}
/// <reference path="../../../references.ts" />
/**
 * Creates a Rectangle object
 *
 * @class Rectangle
 */
class Rectangle {
    /**
     * The position (x and y)
     *
     * @property pos
     * @type Point
     */
    pos: Point;
    /**
     * The size (width and height)
     *
     * @property size
     * @type Size
     */
    size: Size;
    /**
     * @constructor
     */
    constructor(pos: Point, size: Size);
    constructor(x: number, y: number, width: number, height: number);
    constructor(obj1: any, obj2: any, width?: number, height?: number) {
        if (obj1 instanceof Point && obj2 instanceof Size) {
            this.pos = obj1;
            this.size = obj2;
        } else if (typeof obj1 === "number" && typeof obj2 === "number") {
            this.pos = new Point(obj1, obj2);
            this.size = new Size(width, height);
        }
    }
    /**
     * Returns the center Point of the Rectangle
     * 
     * @method center()
     * @return {Point}
     */
    center(): Point {
        let x = this.pos.x + this.size.width / 2;
        let y = this.pos.y + this.size.height / 2;
        return new Point(x, y);
    }
    /**
     * Returns an Array of Points that make up the Rectangle
     * 
     * @method points()
     * @return {Point[]}
     */
    points(): Point[] {
        let p2 = new Point(this.pos.x + this.size.width, this.pos.y);
        let p3 = new Point(this.pos.x + this.size.width, this.pos.y + this.size.height);
        let p4 = new Point(this.pos.x, this.pos.y + this.size.height);
        return [this.pos, p2, p3, p4];
    }
    /**
     * Returns a boolean, if true means the input is colliding with the Rectangle
     * 
     * @method collides()
     * @return {boolean}
     */
    collides(circle: Circle): boolean;
    collides(rectangle: Rectangle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, size: Size): boolean;
    collides(obj: any, size?: Size): boolean {
        // Is given a Circle
        if (obj instanceof Circle) {
            return this.circleAndRectCollision(obj);
        }
        // Is given a Rectangle
        else if (obj instanceof Rectangle) {
            return this.collision(obj.pos.x, obj.pos.y, obj.size.width, obj.size.height);
        } else if (obj instanceof Point) {
            // Is given a Point and a Size
            if (size != null) {
                return this.collision(obj.x, obj.y, size.width, size.height);
            }
            // Is just given a Point
            else {
                return this.collision(obj.x, obj.y, 0, 0);
            }
        }
    }
    /**
     * Returns a boolean, if true means either a Point or Rectangle is colliding 
     * with the Rectangle
     * 
     * @method collision()
     * @private
     * @return {boolean}
     */
    private collision(x: number, y: number, width: number, height: number): boolean {
        // Is colliding
        if (x + width >= this.pos.x &&
            x <= this.pos.x + this.size.width &&
            y + height >= this.pos.y &&
            y <= this.pos.y + this.size.height) {
            return true;
        }
        // Is not colliding
        else {
            return false;
        }
    }
    /**
     * Returns a boolean, if true means a Circle is colliding with the Rectangle
     * 
     * @method circleAndRectCollision()
     * @private
     * @return {boolean}
     */
    private circleAndRectCollision(circle: Circle): boolean {
        let distanceX = Math.abs(circle.center().x - this.center().x);
        let distanceY = Math.abs(circle.center().y - this.center().y);

        if (distanceX > (this.size.width / 2 + circle.radius)) { return false; }
        if (distanceY > (this.size.height / 2 + circle.radius)) { return false; }

        if (distanceX <= (this.size.width / 2)) { return true; }
        if (distanceY <= (this.size.height / 2)) { return true; }

        let cornerDistance_sq = Math.pow((distanceX - this.size.width / 2), 2) +
            Math.pow((distanceY - this.size.height / 2), 2);

        return (cornerDistance_sq <= Math.pow(circle.radius, 2));
    }
}   