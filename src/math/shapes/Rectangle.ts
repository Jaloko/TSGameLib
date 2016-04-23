/// <reference path="../../../references.ts" />
/**
 * Creates a Rectangle object
 *
 * @class Rectangle
 */
class Rectangle {
    /**
     * The position (x and y)
     *
     * @property pos
     * @type Point
     */
    pos: Point;
    /**
     * The size (width and height)
     *
     * @property size
     * @type Size
     */
    size: Size;
    /**
     * @constructor
     */
    constructor(pos: Point, size: Size);
    constructor(x: number, y: number, width: number, height: number);
    constructor(obj1: any, obj2: any, width?: number, height?: number) {
        if (obj1 instanceof Point && obj2 instanceof Size) {
            this.pos = obj1;
            this.size = obj2;
        } else if (typeof obj1 === "number" && typeof obj2 === "number") {
            this.pos = new Point(obj1, obj2);
            this.size = new Size(width, height);
        }
    }
    /**
     * Returns the center Point of the Rectangle
     * 
     * @method center()
     * @return {Point}
     */
    center(): Point {
        let x = this.pos.x + this.size.width / 2;
        let y = this.pos.y + this.size.height / 2;
        return new Point(x, y);
    }
    /**
     * Returns an Array of Points that make up the Rectangle
     * 
     * @method points()
     * @return {Point[]}
     */
    points(): Point[] {
        let p2 = new Point(this.pos.x + this.size.width, this.pos.y);
        let p3 = new Point(this.pos.x + this.size.width, this.pos.y + this.size.height);
        let p4 = new Point(this.pos.x, this.pos.y + this.size.height);
        return [this.pos, p2, p3, p4];
    }
    /**
     * Returns a boolean, if true means the input is colliding with the Rectangle
     * 
     * @method collides()
     * @return {boolean}
     */
    collides(circle: Circle): boolean;
    collides(rectangle: Rectangle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, size: Size): boolean;
    collides(obj: any, size?: Size): boolean {
        // Is given a Circle
        if (obj instanceof Circle) {
            return this.circleAndRectCollision(obj);
        }
        // Is given a Rectangle
        else if (obj instanceof Rectangle) {
            return this.collision(obj.pos.x, obj.pos.y, obj.size.width, obj.size.height);
        } else if (obj instanceof Point) {
            // Is given a Point and a Size
            if (size != null) {
                return this.collision(obj.x, obj.y, size.width, size.height);
            }
            // Is just given a Point
            else {
                return this.collision(obj.x, obj.y, 0, 0);
            }
        }
    }
    /**
     * Returns a boolean, if true means either a Point or Rectangle is colliding 
     * with the Rectangle
     * 
     * @method collision()
     * @private
     * @return {boolean}
     */
    private collision(x: number, y: number, width: number, height: number): boolean {
        // Is colliding
        if (x + width >= this.pos.x &&
            x <= this.pos.x + this.size.width &&
            y + height >= this.pos.y &&
            y <= this.pos.y + this.size.height) {
            return true;
        }
        // Is not colliding
        else {
            return false;
        }
    }
    /**
     * Returns a boolean, if true means a Circle is colliding with the Rectangle
     * 
     * @method circleAndRectCollision()
     * @private
     * @return {boolean}
     */
    private circleAndRectCollision(circle: Circle): boolean {
        let distanceX = Math.abs(circle.center().x - this.center().x);
        let distanceY = Math.abs(circle.center().y - this.center().y);

        if (distanceX > (this.size.width / 2 + circle.radius)) { return false; }
        if (distanceY > (this.size.height / 2 + circle.radius)) { return false; }

        if (distanceX <= (this.size.width / 2)) { return true; }
        if (distanceY <= (this.size.height / 2)) { return true; }

        let cornerDistance_sq = Math.pow((distanceX - this.size.width / 2), 2) +
            Math.pow((distanceY - this.size.height / 2), 2);

        return (cornerDistance_sq <= Math.pow(circle.radius, 2));
    }
}   