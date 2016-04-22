/// <reference path="../../../references.ts" />
/**
 * Creates a Circle object
 *
 * @class
 */
class Circle {
    /**
     * The position (x and y).
     * The circle position currently goes from the top left of the circle.
     * This is so when it comes to rendering sprites you won't have to offset
     * the radius from the position each time.
     * This may be changed in the future.
     *
     * @property pos
     * @type Point
     */
    pos: Point;
    /**
     * The radius
     *
     * @property radius
     * @type number
     */
    radius: number;
    /**
     * @constructor
     */
    constructor(pos: Point, radius: number) {
        this.pos = pos;
        this.radius = radius;
    }
    /**
     * Returns the center Point of the Circle
     * 
     * @method center()
     * @return {Point}
     */
    center(): Point {
        return new Point(this.pos.x + this.radius, this.pos.y + this.radius);
    }
    /**
     * Returns a boolean, if true means the input is colliding with the Circle
     * 
     * @method collides()
     * @return {boolean}
     */
    collides(rectangle: Rectangle): boolean;
    collides(circle: Circle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, radius: number): boolean;
    collides(obj: any, radius?:number): boolean {
        // Is given a rectangle
        if(obj instanceof Rectangle) {
            return obj.collides(this);
        }
        // Is given a Circle
        else if(obj instanceof Circle) {
            return this.collision(obj.center().x, obj.center().y, obj.radius);
        } 
        // Is given a Point and radius
        else if(obj instanceof Point && radius != null) {
            return this.collision(obj.x + radius, obj.y + radius, radius);
        } 
        // Is only given a Point
        else if (obj instanceof Point) {
            return this.collision(obj.x, obj.y);  
        }
    }
    /**
     * Returns a boolean, if true means either a Point or Circle is colliding 
     * with the Circle
     * 
     * @method collision()
     * @private
     * @return {boolean}
     */
    private collision(x: number, y: number, radius?: number) {
        var r1 = this.radius;
        // Only need second radius for circle on circle collisin
        var r2 = radius != null ? radius : 0;
        var bb = this.center().x - x;
        bb = bb * bb;
        var cc = this.center().y - y;
        cc = cc * cc;
        var d = Math.sqrt(bb + cc);
        // Is colliding
        if (r1 + r2 > d) {
            return true;
        } 
        // Is not colliding
        else {
            return false;
        } 
    }
}