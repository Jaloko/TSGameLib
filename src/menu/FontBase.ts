/// <reference path="../../references.ts" />
/**
 * FontBase abstract class
 *
 * @class FontBase
 * @abstract
 */
abstract class FontBase {
    /**
     * Stores the font for the menu
     *
     * @property font
     * @type string
     */
    font: string;
    /**
     * Font Size for the text to be rendered
     *
     * @property fontSize
     * @type number
     */
    fontSize: number;
    /**
     * Stores the font colour
     *
     * @property fontColour
     * @type string
     */
    fontColour: string;
    /**
     * The alignment of the text
     *
     * @property textAlign
     * @type string
     */
    textAlign: string;
    /**
     * @constructor
     */
    constructor(font: string, fontSize: number, fontColour: string,
        textAlign: string) {
        this.font = font;
        this.fontSize = fontSize;
        this.fontColour = fontColour;
        this.textAlign = textAlign;
    }
    /**
     * Applys the font options to the canvas context
     *
     * @method applyFontSettings()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     */
    applyFontSettings(ctx) {
        ctx.font = this.fontSize + 'px ' + this.font;
        ctx.fillStyle = this.fontColour;
        ctx.textAlign = this.textAlign;
    }
}