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
     *
     * Commented out due to it breaking the doc generator
     * @method render()
     * @param {CanvasRenderingContext2D} ctx The canvas context
     */
    render(ctx: CanvasRenderingContext2D) {
		let menu = this._menus[this._menuIndex]; 
        menu.render(ctx);
	}
	 /**
     * Changes the current selectedText item in the current menu
     * 
     * @method changeSelectedText()
     * @param textIndex  Index of the text item
     */
	changeSelectedText(textIndex: number) {
		this._menus[this._menuIndex]._selectedText = textIndex
	}
	/**
     * When a keyboard event occurs this method will be triggered
     * Only supports Up, Down and Enter currently 
     *
     * @method onKeyPress()
     * @param event The keyboard event
     */
	onKeyPress(event: KeyboardEvent){
        let menu = this._menus[this._menuIndex]; 
		switch (event.keyCode) {
			case this._keycodes[this._keyType].up: 
                menu.changeOption(-1);
				break;
			
			case this._keycodes[this._keyType].down:
                menu.changeOption(+1);
				break;

			case this._keycodes[this._keyType].left: // Left
				break;

			case this._keycodes[this._keyType].right: // Right
				break;

			case this._keycodes.enter: // Enter
                menu.executeAction(this);
				break;
		}
	}
    /**
     * When the mouse down event occurs this method will be triggered
     *
     * @method onMouseDown()
     * @param {MouseEvent} event The mouse event
     * @param {CanvasRenderingContext2D} ctx The canvas context
     */
    onMouseDown(event: MouseEvent, ctx: CanvasRenderingContext2D) {
        let menu = this._menus[this._menuIndex]; 
        if(menu.checkTextCollision(event, ctx)) {
            menu.executeAction(this);
        }
    }
    /**
     * When the mouse move event occurs this method will be triggered
     *
     * @method onMouseMove()
     * @param {MouseEvent} event The mouse event
     * @param {CanvasRenderingContext2D} ctx The canvas context
     */
    onMouseMove(event: MouseEvent, ctx: CanvasRenderingContext2D) {
        let menu = this._menus[this._menuIndex];      
        menu.changeOptionWithMouse(event, ctx);
    }
}