import { Cell } from "./cell";

export class CornerCell extends Cell {
    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition, 2);
    }
}