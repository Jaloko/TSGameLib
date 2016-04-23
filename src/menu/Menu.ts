/// <reference path="../../references.ts" />
/**
 * Creates a Menu Object
 * @class
 */
class Menu{
	/*
	* Stores the font for the menu
	* @property font
	* @type string
	*/
	_font: string; 
	/*
	* Font Size for the text to be rendered
	* @property fontSize
	* @type number
	*/
	_fontSize: number;

	/*
	* Stores the font colour
	* @property _fontColour
	* @type string
	*/
	_fontColour: string;
	/*
	* The alignment of the text
	* @property _textAlign
	* @type string
	*/
	_textAlign: string;

	/*
	* Menu backgrounds could change storing the hex value allows us to change the colour at will
	* @property backgroundColour
	* @type string
	*/
	_backgroundColour: string;

	/*
	* The text to be rendered
	* @property _text
	* @type string[]
	*/
	_text: string[];

	/*
	* Selected Text, when the menu is rendered if the text is selected it will display < text > 
	* @property _selectedText
	* @type number
	*/

	_selectedText:number;

	/**
     * @constructor
     * The text is its own unique string array
     * Params is its own array 
     * @param text Is an Array that contains the text in a simple array format not in an object
     * @param parmas Is an object that contains the formatting for the text
     */
	constructor(text, params) {
		this._text = text;

		this._font = params.font;
		this._fontSize = params.fontSize;
		this._fontColour = params.fontColour;
		this._textAlign = params.textAlign;
		this._backgroundColour = params.backgroundColour;
		this._selectedText = 0;
	}
}