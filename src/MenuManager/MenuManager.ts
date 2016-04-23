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
		// let menu  = this._menus[this._menuIndex]; 
		// TODO CanvasManager
		// let center = CanvasManager.getCanvasCenter();
		// let textToRender = menu._text;
		// let textPositions = this.getHeightPositions(textToRender.length + 1);

		// ctx.fillStyle = menu._fontColour;
		// ctx.textAlign = menu._textAlign;

		// ctx.font = menu._font;
		// for(let t = 0; t < textToRender.length; t++){
		// 	let text ="";
		// 	if(this._menus[this._menuIndex]._selectedText === t){
		// 		text += `< $(textToRender[t]) >`;
		// 	}
		// 	else{
		// 		text += textToRender[t];
		// 	}

		// 	ctx.fillText(text, center.x, textPositions[t+1]);
		// }
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
		// let size = CanvasManager.getCanvasSize(); // todo create canvas class
		// let division = (size.height) / textCount;

		// let array = [];
		// for(let i = 0; i < textCount; i++) {
		// 	array.push((division * i) + (division / 2));
		// }
		// return array;
	}
}