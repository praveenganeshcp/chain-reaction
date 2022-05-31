import { Cell } from "./cell";

export class EdgeCell extends Cell {
    constructor(xPosition: number, yPosition: number) {
        super(xPosition, yPosition, 3);
    }
}