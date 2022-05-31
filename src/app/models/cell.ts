export const ROW_SIZE = 7;
export const COL_SIZE = 8;

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
        return this.isTopLeftCorner() || this.isTopRightCorner() || this.isBottomLeftCorner() || this.isBottomRightCorner();
    }

	isEdge(): boolean {
        return this.isBottomEdge() || this.isTopEdge() || this.isLeftEdge() || this.isRightEdge();
    }

	isMiddle(): boolean {
        return this.isCorner() == false && this.isEdge() === false;
    }

	isTopLeftCorner(): boolean {
        return this.getXPosition() === 0 && this.getYPosition() === 0;
    }

	isTopRightCorner(): boolean {
        return this.getXPosition() === 0 && this.getYPosition() === COL_SIZE-1;
    }

	isBottomLeftCorner(): boolean {
        return this.getXPosition() === ROW_SIZE-1 && this.getYPosition() === 0;
    }

	isBottomRightCorner(): boolean {
        return this.getXPosition() === ROW_SIZE-1 && this.getYPosition() === COL_SIZE-1;
    }

	isTopEdge(): boolean {
        return this.getXPosition() === 0;
    }

	isLeftEdge(): boolean {
        return this.getYPosition() === 0;
    }

	isRightEdge(): boolean {
        return this.getYPosition() === COL_SIZE-1;
    }

	isBottomEdge(): boolean {
        return this.getXPosition() === ROW_SIZE-1;
    }
}