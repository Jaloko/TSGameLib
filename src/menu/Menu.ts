/// <reference path="../../references.ts" />
/**
 * Creates a Menu object
 *
 * @class Menu
 */
class Menu{
    /**
     * Stores menu title options
     *
     * @property title
     * @type MenuTitle
     */
    title: MenuTitle;
    /**
     * Stores menu options
     *
     * @property options
     * @type MenuOptions
     */
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
     * @param {number} val Changes the selected menu option
     */
    changeOption(val: number) {
        this.options.changeOption(val);
    }
    /**
     * Wrapper, Executes a function linked to a menu text option
     *
     * @method executeAction()
     * @param {MenuManager} menuManager MenuManager is passed down so that menu options can change the menu selected
     */
    executeAction(menuManager: MenuManager) {
        this.options.executeAction(menuManager);
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