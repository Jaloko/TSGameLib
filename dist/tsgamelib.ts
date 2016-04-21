class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

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

    addX(x: number): void {
        this.x += x;
    }

    addY(y: number): void {
        this.y += y;
    }
}
class Size {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
class Circle {
    // The circle position currently goes from the top left of the circle.
    // This is so when it comes to rendering sprites you won't have to offset
    // the radius from the position each time.
    // This may be changed in the future.
    pos: Point;
    radius: number;

    constructor(pos: Point, radius: number) {
        this.pos = pos;
        this.radius = radius;
    }

    center(): Point {
        return new Point(this.pos.x + this.radius, this.pos.y + this.radius);
    }

    collides(circle: Circle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, radius: number): boolean;
    collides(obj: any, radius?:number): boolean {
        // Is given a Circle
        if(obj instanceof Circle) {
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
class Rectangle {
    pos: Point;
    size: Size;
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

    center(): Point {
        let x = this.pos.x + this.size.width / 2;
        let y = this.pos.y + this.size.height / 2;
        return new Point(x, y);
    }

    points(): Point[] {
        var p2 = new Point(this.pos.x + this.size.width, this.pos.y);
        var p3 = new Point(this.pos.x + this.size.width, this.pos.y + this.size.height);
        var p4 = new Point(this.pos.x, this.pos.y + this.size.height);
        return [this.pos, p2, p3, p4];
    }

    collides(circle: Circle): boolean;
    collides(rectangle: Rectangle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, size: Size): boolean;
    collides(obj: any, size?: Size): boolean {
        // Is given a Circle
        if(obj instanceof Circle) {
            let points = this.points();
            return obj.collides(points[0]) || obj.collides(points[1]) || 
                obj.collides(points[2]) || obj.collides(points[3]);
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
} 