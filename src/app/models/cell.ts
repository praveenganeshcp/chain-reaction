export const BOARD_SIZE = 7;

export abstract class Cell {
	private xPosition: number
	private yPosition: number
	private color: string;
	private threshold: number
	private count: number
	
	constructor(xPosition: number, yPosition: number, threshold: number) {
        this.setXPosition(xPosition);
        this.setYPosition(yPosition);
        this.setCount(0);
        this.setEmptyColor();
        this.setThreshold(threshold);
    }

    private setXPosition(xPosition: number): void {
        this.xPosition = xPosition;
    }

    private getXPosition() {
        return this.xPosition;
    }

    private setYPosition(yPosition: number): void {
        this.yPosition = yPosition;
    }

    private getYPosition() {
        return this.yPosition;
    }

    private setEmptyColor() {
        this.setColor('black');
    }

    setColor(color: string) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    isEmpty() {
        return this.getCount() === 0;
    }

    makeEmpty() {
        this.setCount(0);
        this.setEmptyColor();
    }

    setCount(count: number) {
        this.count = count;
    }

    getCount(): number {
        return this.count;
    }

	private setThreshold(threshold: number): void {
        this.threshold = threshold;
    }

	reachedThreshold(): boolean {
        return this.count === this.threshold;
    }

	incrementCount(): void {
        this.count += 1;
    }
	
	isCorner(): boolean {
        return (this.getXPosition() === 0 && this.getYPosition() === 0) || (this.getXPosition() === BOARD_SIZE && this.getYPosition() === 0) || (this.getXPosition() === 0 && this.getYPosition() === BOARD_SIZE) || (this.getXPosition() === BOARD_SIZE && this.getYPosition() === BOARD_SIZE);
    }

	isEdge(): boolean {
        return this.getXPosition() === 0 || this.getXPosition() === BOARD_SIZE || this.getYPosition() === 0 || this.getYPosition() === BOARD_SIZE;
    }

	isMiddle(): boolean {
        return this.getXPosition() !== 0 && this.getXPosition() !== BOARD_SIZE && this.getYPosition() !== 0 && this.getYPosition() !== BOARD_SIZE;
    }

	isTopLeftCorner(): boolean {
        return this.getXPosition() === 0 && this.getYPosition() === 0;
    }

	isTopRightCorner(): boolean {
        return this.getXPosition() === 0 && this.getYPosition() === BOARD_SIZE;
    }

	isBottomLeftCorner(): boolean {
        return this.getXPosition() === BOARD_SIZE && this.getYPosition() === 0;
    }

	isBottomRightCorner(): boolean {
        return this.getXPosition() === BOARD_SIZE && this.getYPosition() === BOARD_SIZE;
    }

	isTopEdge(): boolean {
        return this.getXPosition() === 0;
    }

	isLeftEdge(): boolean {
        return this.getYPosition() === 0;
    }

	isRightEdge(): boolean {
        return this.getYPosition() === BOARD_SIZE;
    }

	isBottomEdge(): boolean {
        return this.getXPosition() === BOARD_SIZE;
    }
}