/// <reference path="../../references.ts" />
/**
 * Creates a Size object
 *
 * @class Size
 */
class Size {
    /**
     * Stores a width
     *
     * @property width
     * @type number
     */
    width: number;
    /**
     * Stores a height
     *
     * @property height
     * @type number
     */
    height: number;
    /**
     * @constructor
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}