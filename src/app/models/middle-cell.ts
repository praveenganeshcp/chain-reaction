import { Cell } from "./cell";

export class MiddleCell extends Cell {
    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition, 4);
    }
}