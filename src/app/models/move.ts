export class Move {
    private x: number
    private y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    toRightCell() {
        return new Move(this.getX(), this.getY()+1);
    }

    toLeftCell() {
        return new Move(this.getX(), this.getY()-1);
    }

    toAboveCell() {
        return new Move(this.getX()-1, this.getY());
    }

    toBelowCell() {
        return new Move(this.getX()+1, this.getY());
    }

}
    