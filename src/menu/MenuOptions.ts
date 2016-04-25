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
     * @param {MenuManager} menuManager MenuManager is passed down so that menu options can change the menu selected
     */
    executeAction(menuManager: MenuManager) {
        this.actions[this.selectedOption](menuManager);
    }
    /**
     * Changes the selected menu option
     *
     * @method changeOption()
     * @param {number} val Changes the selected menu option
     */
    changeOption(val: number) {
        this.selectedOption += val;
        if (this.selectedOption < 0) {
            this.selectedOption = this.text.length - 1;
        } else if (this.selectedOption >= this.text.length) {
            this.selectedOption = 0;
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