/// <reference path="../../references.ts" />
/**
 * Creates a MenuTitle object
 *
 * @class MenuTitle
 */
class MenuTitle extends FontBase {
    /**
     * The text to be rendered
     * @property text
     * @type string
     */
    text: string;
    /**
     * @constructor
     */
    constructor(font: string, fontSize: number, fontColour: string,
        textAlign: string, text: string) {
        super(font, fontSize, fontColour, textAlign);
        this.text = text;
    }
    /**
     * Renders the the menu title
     *
     * Commented out due to it breaking the doc generator
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     * @param {number} x X position
     * @param {number} y Y position
     */
    render(ctx, x, y) {
        super.applyFontSettings(ctx);
        ctx.fillText(this.text, x, y);
    }
}