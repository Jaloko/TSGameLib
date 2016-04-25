/// <reference path="../../references.ts" />
/**
 * Creates a Menu object
 *
 * @class Menu
 */
class Menu{
    title: MenuTitle;
    options: MenuOptions; 
    /**
     * @constructor
     */
    constructor(title: MenuTitle, options: MenuOptions) {
        this.title = title;
        this.options = options;
    }
    /**
     * Wrapper, Changes the selected menu option
     *
     * @method changeOption()
     * @param {boolean} moveDown Is the menu option moving down
     */
    changeOption(moveDown: boolean) {
        this.options.changeOption(moveDown);
    }
    /**
     * Wrapper, Executes a function linked to a menu text option
     *
     * @method executeAction()
     */
    executeAction() {
        this.options.executeAction();
    }
    /**
     * Renders the menu options
     *
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     */
    render(ctx) {
        let center = Utils.getCanvasCenter();
        let textPositions = this.getHeightPositions(this.options.text.length + 1);
        this.title.render(ctx, center.x, textPositions[0])
        textPositions.splice(0, 1);
        this.options.render(ctx, center.x, textPositions);
    };
    /**
     * Gets the height positions based on the number of text items in the current menu._text
     * 
     * @method getHeightPositions()
     * @param event The keyboard event
     * @return {number} textCount Number of menu options
     * @private
     */
    private getHeightPositions(textCount: number){
        let size = Utils.getCanvasSize(); // todo create canvas class
        let division = (size.height) / textCount;

        let array = [];
        for(let i = 0; i < textCount; i++) {
            array.push((division * i) + (division / 2));
        }
        return array;
    }
}