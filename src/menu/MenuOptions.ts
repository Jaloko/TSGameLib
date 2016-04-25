/// <reference path="../../references.ts" />
/**
 * Creates a MenuOptions object
 *
 * @class MenuOptions
 */
class MenuOptions extends FontBase {
    /**
     * The text to be rendered
     *
     * @property text
     * @type string[]
     */
    text: string[];
    /**
     * The text to be rendered
     *
     * @property text
     * @type []
     */
    actions: any[];
    /**
     * Selected Option, when the menu is rendered if the option is selected it will display < text > 
     *
     * @property selectedOption
     * @type number
    */
    selectedOption: number;
    /**
     * @constructor
     */
    constructor(font: string, fontSize: number, fontColour: string,
        textAlign: string, text: string[], actions: any[]) {
        super(font, fontSize, fontColour, textAlign);
        this.text = text;
        this.actions = actions;
        this.selectedOption = 0;
    }
    /**
     * Executes a function linked to a menu text option
     *
     * @method executeAction()
     */
    executeAction() {
        this.actions[this.selectedOption]();
    }
    /**
     * Changes the selected menu option
     *
     * @method changeOption()
     * @param {boolean} moveDown Is the menu option moving down
     */
    changeOption(moveDown: boolean) {
        if (moveDown) {
            this.selectedOption++;
            if (this.selectedOption >= this.text.length) {
                this.selectedOption = 0;
            }
        } else {
            this.selectedOption--;
            if (this.selectedOption < 0) {
                this.selectedOption = this.text.length - 1;
            }
        }
    }
    /**
     * Renders the menu options
     *
     * Commented out due to it breaking the doc generator
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     * @param {number} x X position
     * @param {number} y Y position
     */
    render(ctx, x, yPositions) {
        super.applyFontSettings(ctx);

        for (let t = 0; t < this.text.length; t++) {
            let text = "";
            if (this.selectedOption === t) {
                text += '< ' + this.text[t] + ' >';
            }
            else {
                text += this.text[t];
            }

            ctx.fillText(text, x, yPositions[t]);
        }
    }
}