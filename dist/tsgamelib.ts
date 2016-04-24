/// <reference path="../../references.ts" />
/**
 * Creates a Animation object
 *
 * @class Animation
 */
class Animation {
    /**
     * A spritesheet containing animation frames
     *
     * @property frames
     * @type HTMLImageElement
     */
    frames: HTMLImageElement;
    /**
     * The current frame the animation is on
     *
     * @property frame
     * @type number
     */
    frame: number;
    /**
     * The width of each frame
     *
     * @property width
     * @type number
     */
    width: number;
    /**
     * The height of each frame
     *
     * @property height
     * @type number
     */
    height: number;
    /**
     * Defines which x frame in the image the animation starts from
     *
     * @property frameXStart
     * @type number
     */
    frameXStart: number;
    /**
     * Defines which y frame in the image the animation starts from
     *
     * @property frameYStart
     * @type number
     */
    frameYStart: number;
    /**
     * Defines how many frames the animation is
     *
     * @property maxFrames
     * @type number
     */
    maxFrames: number;
    /**
     * Speed in milliseconds that the frames change
     *
     * @property speed
     * @type number
     */
    speed: number;
    /**
     * Stores the time the frame was last changed
     *
     * @property timer
     * @type number
     */
    timer: number;
    /**
     * Stores the amount of times a full animation cycle occurs unless reset
     *
     * @property loop
     * @type number
     */
    looped: number = 0;
    /**
     * @constructor
     */
    constructor(frames: HTMLImageElement, maxFrames: number,width: number, height: number, 
        frameXStart: number, frameYStart: number, speed?: number) {
        this.frames = frames;
        this.frame = frameXStart;
        this.width = width;
        this.height = height;
        this.frameXStart = frameXStart;
        this.frameYStart = frameYStart;
        this.maxFrames = maxFrames;
        this.timer = new Date().getTime();
        this.looped = 0;

        if (speed != null) {
            this.speed = speed;
        } else {
            this.speed = 200;
        }
    }
    /**
     * Updates the frame the animation is on
     *
     * @method update()
     */
    update() {
        if (new Date().getTime() > this.timer + this.speed) {
            this.frame++;
            if (this.frame > this.maxFrames) {
                this.frame = this.frameXStart;
                this.looped++;
            }
            this.timer = new Date().getTime();
        }
    }
    /**
     * Renders the current animation frame
     *
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} renderWidth Render width
     * @param {number} renderHeight Render height
     */
    render(ctx, x, y, renderWidth, renderHeight) {
        ctx.drawImage(
            this.frames,
            this.width * this.frame,
            this.frameYStart * this.height,
            this.width,
            this.height,
            x,
            y,
            renderWidth,
            renderHeight
        );
    }
    /**
     * Resets the current frame and the amount of times looped
     *
     * @method reset()
     */
    reset() {
        this.looped = 0;
        this.frame = this.frameXStart;
    }

}
type UrlMap = { [name: string]: string };

/**
 * Manages images loaded from external URLs.
 * 
 * @class ImageManager
 */
class ImageManager {
    private urls: UrlMap;
    /**
     * Loaded images accessible by name.
     * 
     * This property is undefined if no images have been loaded.
     */
    images: { [name: string]: HTMLImageElement };
    
    /**
     * @constructor
     * @param urls A collection of image names and their corresponding URLs.
     */
    constructor(urls: UrlMap) {
        this.urls = urls;
    }
    
    /**
     * Loads all images from the specified URLs.
     * 
     * @param next Function to be called when all images have been loaded.
     */
    load(next: () => void): void {
        let imageLoadedCount = 0;
        let t = this;

        for (let k in this.urls) {
            this.images[k] = new Image();

            this.images[k].onload = () => {
                imageLoadedCount++;
                if (imageLoadedCount == Object.keys(this.urls).length) {
                    next();
                }
            }

            this.images[k].src = this.urls[k];
        }
    }
}


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
 * Creates a Map object
 *
 * @class Map
 */
class Map {
    /**
     * A spritesheet containing the maps tiles
     *
     * @property tileSheet
     * @type HTMLImageElement
     */
    tileSheet: HTMLImageElement;
    /**
     * The size of each individual tile on the tilesheet
     *
     * @property tileSize
     * @type Size
     */
    tileSize: Size;
    /**
     * The size of each individual tile on the tilesheet
     *
     * @property tileSize
     * @type Size
     */
    mapSize: Size;
    /**
     * Stores the position of the tile on the tilesheet
     *
     * @property tileData
     * @type number[]
     */
    tileData: any[]; // Will change from any once this class is tested
    /**
     * Stores the entie map
     *
     * @property mapData
     * @type number[]
     */
    mapData: number[];
    /**
     * @constructor
     */
    constructor(tileSheet: HTMLImageElement, tileSize: Size, 
        mapSize: Size, tileData: number[], mapData: number[]) {
        this.tileSheet = tileSheet;
        this.tileSize = tileSize;
        this.mapSize = mapSize;
        this.tileData = tileData;
        this.mapData = mapData;
    }
    /**
     * Renders all tiles in the map. This method currently assumes cameraX
     * and cameraY is at the top left corner, will probably change to the center
     *
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     * @param {number} cameraX Camera x position
     * @param {number} cameraY Camera y position
     */
    render(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
        let canvasSize = Utils.getCanvasSize();
        let width = this.tileSize.width;
        let height = this.tileSize.height;
        for (let x = 0; x < this.mapSize.width; x++) {
            for (let y = 0; y < this.mapSize.height; y++) {
                // Dont render tiles off the screen
                if (x * width < cameraX - width || 
                    x * width > cameraX + canvasSize.width + width ||
                    y * height < cameraY - height || 
                    y * height > cameraY + canvasSize.height + height) {
                    continue;
                }
                let tile = this.tileData[this.mapData[x][y]];
                // Render tile
                ctx.drawImage(
                    this.tileSheet,
                    tile.x * width,
                    tile.y * height,
                    width,
                    height,
                    x * width,
                    y * height,
                    width,
                    height
                );
            }
        }
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
/// <reference path="../../references.ts" />
/**
 * Creates a Menu Object
 * @class
 */
class Menu{
	/*
	* Stores the font for the menu
	* @property font
	* @type string
	*/
	_font: string; 
	/*
	* Font Size for the text to be rendered
	* @property fontSize
	* @type number
	*/
	_fontSize: number;

	/*
	* Stores the font colour
	* @property _fontColour
	* @type string
	*/
	_fontColour: string;
	/*
	* The alignment of the text
	* @property _textAlign
	* @type string
	*/
	_textAlign: string;

	/*
	* Menu backgrounds could change storing the hex value allows us to change the colour at will
	* @property backgroundColour
	* @type string
	*/
	_backgroundColour: string;

	/*
	* The text to be rendered
	* @property _text
	* @type string[]
	*/
	_text: string[];

	/*
	* Selected Text, when the menu is rendered if the text is selected it will display < text > 
	* @property _selectedText
	* @type number
	*/

	_selectedText:number;

	/**
     * @constructor
     * The text is its own unique string array
     * Params is its own array 
     * @param text Is an Array that contains the text in a simple array format not in an object
     * @param parmas Is an object that contains the formatting for the text
     */
	constructor(text, params) {
		this._text = text;

		this._font = params.font;
		this._fontSize = params.fontSize;
		this._fontColour = params.fontColour;
		this._textAlign = params.textAlign;
		this._backgroundColour = params.backgroundColour;
		this._selectedText = 0;
	}
}
/// <reference path="../../references.ts" />
/**
 * MenuManager
 * Manages all the menus through this manager, rather than call individual menus.
 *
 * @class
 */
class MenuManager {
	 /**
     * Menus stores all the menus in the game. 
     * Start menu needs to be the first menu pushed.
     * @property _menus
     * @type any[]
     */
	_menus: any[];

	 /**
     * Menu index is the current selected menu to be rendered
     * 
     * @property _menuIndex
     * @type number
     */
	_menuIndex: number;

	/**
	 * The game library will support various types of key inputs 
	 * This means either 'WASD' or the arrow keys can be supported
	 * @property _keyType
	 * @type string
	 */
	_keyType: string;

	 /**
	 * All the supported keys 
	 * 
	 * @property _keyCodes
	 * @type Object
	 */
	_keycodes = {
		'wasd': {
			up: 87,
			down: 83,
			left: 65,
			right: 68,
		},
		'arrows':{
			up: 38,
			down: 40,
			left: 37,
			right: 39,
		},

		enter: 13,
		space: 32,
		backspace: 8,
		shift: 16,
		escape: 27,
	}

	constructor(menus, settings) {
		this._menus = menus;
		this._keyType = settings.keyType;

		this._menuIndex = 0; // The start menu must always be 0

	}
	 /**
     * Changes the current menu
     * @method changeMenu()
     * @param menuIndex  The menus index
     */
	changeMenu(menuIndex: number){
		this._menuIndex = menuIndex;
	}

	 /**
     * Renders the current menu to be shown
     * This does not render
     * TODO: CanvasManager
     * Commented out due to it breaking the doc generator
     * @method render()
     * @param ctx - canvas 2d context
     */
	render(ctx){
		let menu  = this._menus[this._menuIndex]; 
		// TODO CanvasManager
		let center = Utils.getCanvasCenter();
		let textToRender = menu._text;
		let textPositions = this.getHeightPositions(textToRender.length + 1);

		ctx.fillStyle = menu._fontColour;
		ctx.textAlign = menu._textAlign;

		ctx.font = menu._font;
		for(let t = 0; t < textToRender.length; t++){
			let text ="";
			if(this._menus[this._menuIndex]._selectedText === t){
				text += `< $(textToRender[t]) >`;
			}
			else{
				text += textToRender[t];
			}

			ctx.fillText(text, center.x, textPositions[t+1]);
		}
	}

	 /**
     * Changes the current selectedText item in the current menu
     * 
     * @method changeSelectedText()
     * @param textIndex  Index of the text item
     */
	changeSelectedText(textIndex) {
		this._menus[this._menuIndex]._selectedText = textIndex
	}


	/**
     * When a keyboard event occurs this method will be triggered
     * Only supports Up, Down and Enter currently 
     *
     * @method onEvent()
     * @param event The keyboard event
     */
	onEvent(event: KeyboardEvent){
		switch (event.keyCode) {
			case this._keycodes[this._keyType].up: 
				break;
			
			case this._keycodes[this._keyType].down:
				break;

			case this._keycodes[this._keyType].left: // Left
				break;

			case this._keycodes[this._keyType].right: // Right
				break;

			case this._keycodes.enter: // Enter
				break;
		}
	}

	/**
     * Gets the height positions based on the number of text items in the current menu._text
     * TODO CanvasManager	
     * Commented out due to it breaking the doc generator
     * @method onEvent()
     * @param event The keyboard event
     * @return {Array}
     */
	getHeightPositions(textCount: number){
		let size = Utils.getCanvasSize(); // todo create canvas class
		let division = (size.height) / textCount;

		let array = [];
		for(let i = 0; i < textCount; i++) {
			array.push((division * i) + (division / 2));
		}
		return array;
	}
}
class Utils{
	 /**
     * Gets the canvas
     * @method getCanvas
     * @return CanvasElement
     */
	static getCanvas() {
		return document.getElementById('canvas');
	}

	/**
     * Gets the canvas size
     * @method getCanvasSize
     * @return CanvasElement
     */
	static getCanvasSize(){
		return {
			width: this.getCanvas().clientWidth,
			height: this.getCanvas().clientHeight
		};
	}

	/**
     * Gets the center of the canvas
     * @method getCanvasCenter
     * @return CanvasElement
     */
	static getCanvasCenter(){
		return {
			x: this.getCanvas().clientWidth / 2,
			y: this.getCanvas().clientHeight / 2
		};
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