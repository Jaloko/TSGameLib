class Circle {
    pos: Point;
    radius: number;

    constructor(pos: Point, radius: number) {
        this.pos = pos;
        this.radius = radius;
    }

    center(): Point {
        return new Point(this.pos.x + this.radius, this.pos.y + this.radius);
    }

    collides(pos: Point): boolean;
    collides(pos: Point, radius: number): boolean;
    collides(pos: Point, radius?:number): boolean {
        // Is given a Point and radius
        if(radius != null) {
            return this.collision(pos.x, pos.y, radius);
        } 
        // Is only given a Point
        else {
            return this.collision(pos.x, pos.y);
        }
    }

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