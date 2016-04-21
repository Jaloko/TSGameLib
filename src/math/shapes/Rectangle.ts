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

    collides(rectangle: Rectangle): boolean;
    collides(pos: Point): boolean;
    collides(pos: Point, size: Size): boolean;
    collides(obj: any, size?: Size): boolean {
        // Is given a Rectangle
        if (obj instanceof Rectangle) {
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