/// <reference path="../../references.ts" />
/**
 * Creates a Point object
 *
 * @class Point
 */
class Point {
    /**
     * X position
     *
     * @property x
     * @type number
     */
    x: number;
    /**
     * Y position
     *
     * @property y
     * @type number
     */
    y: number;
    /**
     * @constructor
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /**
     * Adds a x and y value to the Point object
     * 
     * @method add()
     */
    add(point: Point): void;
    add(size: Size): void;
    add(x: number, y: number): void;
    add(obj1: any, obj2?: any): void {
        // Is only given a Point
        if (obj1 instanceof Point && obj2 == null) {
            this.addX(obj1.x);
            this.addY(obj1.y);
        }
        // Is only given a Size
        else if (obj1 instanceof Size && obj2 == null) {
            this.addX(obj1.width);
            this.addY(obj1.height);
        }
        // Is given two numbers
        else if(typeof obj1 == "number" && typeof obj2 == "number") {
            this.addX(obj1);
            this.addY(obj2);
        }
    }
    /**
     * Adds a x value to the Point object
     * 
     * @method add()
     */
    addX(x: number): void {
        this.x += x;
    }
    /**
     * Adds a y value to the Point object
     * 
     * @method add()
     */
    addY(y: number): void {
        this.y += y;
    }
}