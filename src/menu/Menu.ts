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
     * Wrapper, Sets the selected menu option
     *
     * @method setOption()
     * @param {number} val Sets the selected menu option
     */
    setOption(val: number) {
        this.options.setOption(val);
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
    render(ctx: CanvasRenderingContext2D) {
        let center = Utils.getCanvasCenter();
        let textPositions = this.getHeightPositions(this.options.text.length + 1);
        this.title.render(ctx, center.x, textPositions[0])
        textPositions.splice(0, 1);
        this.options.render(ctx, center.x, textPositions);
    };
    /**
     * If the mouse position collides with the selected text option return true
     *
     * @method checkTextCollision()
     * @param {MouseEvent} event The mouse event
     * @param {CanvasRenderingContext2D} ctx The canvas context
     * @return {boolean} is the mouse position collision with the selected text options
     */
    checkTextCollision(event: MouseEvent, ctx: CanvasRenderingContext2D) {
        // Left click
        if (event.buttons === 1) {
            let center = Utils.getCanvasCenter();
            let textPositions = this.getHeightPositions(this.options.text.length + 1);
            // Remove title position
            textPositions.splice(0, 1);
            // Get selected text rectangle bounds
            let textWidth = ctx.measureText(this.options.getSelected()).width;
            let textHeight = this.options.fontSize * 2;
            let pos = new Point(center.x - (textWidth / 2), textPositions[this.options.selectedOption] - (textHeight / 2));
            let size = new Size(textWidth, textHeight);

            // Check collision with text bounds and mouse position
            if (new Rectangle(pos, size).collides(new Point(event.clientX, event.clientY))) {

                return true;
            }
        }
        return false;
    }
    /**
     * Change option based on mouse position
     *
     * @method changeOptionWithMouse()
     * @param {MouseEvent} event The mouse event
     * @param {CanvasRenderingContext2D} ctx The canvas context
     */
    changeOptionWithMouse(event: MouseEvent, ctx: CanvasRenderingContext2D) {
        let center = Utils.getCanvasCenter();
        let textPositions = this.getHeightPositions(this.options.text.length + 1);
        // Remove title position
        textPositions.splice(0, 1);
        for (let i = 0; i < this.options.text.length; i++) {
            // Get selected text rectangle bounds

            let textWidth = ctx.measureText(this.options.getSelected()).width;
            let textHeight = this.options.fontSize * 2;
            let pos = new Point(center.x - (textWidth / 2), textPositions[i] - (textHeight / 2));
            let size = new Size(textWidth, textHeight);

            // Check collision with text bounds and mouse position
            if (new Rectangle(pos, size).collides(new Point(event.clientX, event.clientY))) {
                this.options.setOption(i);
                break;
            }
        }
    }
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