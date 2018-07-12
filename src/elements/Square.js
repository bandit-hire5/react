class Square {
    constructor(options) {
        let {x, y, color} = options;

        this.x = x;
        this.y = y;
        this.color = color;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getColor() {
        return this.color;
    }
}

export default Square;