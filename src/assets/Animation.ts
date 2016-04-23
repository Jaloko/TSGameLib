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
     * Updates the the frame the animation is on
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