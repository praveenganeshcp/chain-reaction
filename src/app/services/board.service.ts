import { Injectable } from '@angular/core';
import { BOARD_SIZE, Cell } from '../models/cell';
import { CornerCell } from '../models/corner-cell';
import { EdgeCell } from '../models/edge-cell';
import { MiddleCell } from '../models/middle-cell';
import { Move } from '../models/move';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private board: Array<Array<Cell>>;
  private activePlayerIndex: number;
  private _isMatchCompleted: boolean
  private players: Player[];

  constructor() { 
    this.board = [];
    this.activePlayerIndex = 0;
    this.players = [];
    this._isMatchCompleted = false;
    this.setPlayersCount(2);
    this.initializeBoard();    
  }

  private initializeBoard() {
    for(let i=0; i<this.getBoardSize(); i++) {
      this.board.push([]);
      for(let j=0; j<this.getBoardSize(); j++) {
        if( (i === 0 && j === 0) || (i === 0 && j === this.getBoardSize()-1) || (i === this.getBoardSize()-1 && j === 0) || (i === this.getBoardSize()-1 && j === this.getBoardSize()-1) ) {
          this.board[i][j] = new CornerCell(i, j);
        }
        else if(i === 0 || i === this.getBoardSize()-1 || j === 0 || j === this.getBoardSize()-1) {
          this.board[i][j] = new EdgeCell(i, j);
        }
        else {
          this.board[i][j] = new MiddleCell(i, j);
        }
      }
    }
  }

  private setPlayersCount(playersCount: number): void {
    // assuming 3 players and can be scaled in the future
    const playerColorCodes = ['red', 'lightgreen', 'blue'];
    for(let i=0; i<playersCount; i++) {
      this.getPlayers().push(new Player(playerColorCodes[i]));
    }
  }

  private getPlayers() {
    return this.players; 
  }

  private getActivePlayer() {
    const activePlayer = this.getPlayers()[this.activePlayerIndex]
    return activePlayer;
  }

  makeMove(move: Move) {
    if(!this.isMatchCompleted()) {
      const cell = this.getCell(move.getX(), move.getY());
      let cellFillColor;
      if(cell.isEmpty()) {
        cellFillColor = this.getActivePlayer().getColor();
      }
      else {
        cellFillColor = cell.getColor();
      }
      if(!cell.isEmpty() && cell.getColor() != this.getActivePlayer().getColor()) {
        return;
      }
      this.triggerChainReaction(move, cellFillColor);
      this.togglePlayerTurn();
    }
  }

  private getCell(xPos: number, yPos: number) {
    return this.getBoard()[xPos][yPos];
  }

  private triggerChainReaction(move: Move, fillColor: string) {
    const cell = this.getCell(move.getX(), move.getY());
    cell.setColor(fillColor);
    cell.incrementCount();
    if(cell.reachedThreshold()) {
      cell.makeEmpty();
      if(cell.isCorner()) {
        if(cell.isTopLeftCorner()) {
          this.triggerChainReaction(move.toBelowCell(), fillColor);
          this.triggerChainReaction(move.toRightCell(), fillColor);
        }
        else if(cell.isTopRightCorner()) {
          this.triggerChainReaction(move.toBelowCell(), fillColor);
          this.triggerChainReaction(move.toLeftCell(), fillColor);
        }
        else if(cell.isBottomLeftCorner()) {
          this.triggerChainReaction(move.toAboveCell(), fillColor);
          this.triggerChainReaction(move.toRightCell(), fillColor);
        }
        else if(cell.isBottomRightCorner()) {
          this.triggerChainReaction(move.toAboveCell(), fillColor);
          this.triggerChainReaction(move.toLeftCell(), fillColor);
        }
      }
      else if(cell.isEdge()) {
        if(cell.isTopEdge()) {
          this.triggerChainReaction(move.toLeftCell(), fillColor);
          this.triggerChainReaction(move.toRightCell(), fillColor);
          this.triggerChainReaction(move.toBelowCell(), fillColor);
        }
        else if(cell.isBottomEdge()) {
          this.triggerChainReaction(move.toLeftCell(), fillColor);
          this.triggerChainReaction(move.toRightCell(), fillColor);
          this.triggerChainReaction(move.toAboveCell(), fillColor);
        }
        else if(cell.isLeftEdge()) {
          this.triggerChainReaction(move.toAboveCell(), fillColor);
          this.triggerChainReaction(move.toBelowCell(), fillColor);
          this.triggerChainReaction(move.toRightCell(), fillColor);
        }
        else if(cell.isRightEdge()) {
          this.triggerChainReaction(move.toAboveCell(), fillColor);
          this.triggerChainReaction(move.toBelowCell(), fillColor);
          this.triggerChainReaction(move.toLeftCell(), fillColor);
        }
      }
      else {
        this.triggerChainReaction(move.toAboveCell(), fillColor);
        this.triggerChainReaction(move.toBelowCell(), fillColor);
        this.triggerChainReaction(move.toLeftCell(), fillColor);
        this.triggerChainReaction(move.toRightCell(), fillColor);
      }
      this.checkIfMatchIsCompleted();
    }
  }

  private checkIfMatchIsCompleted() {
    const uniqueColorsOnBoard = new Set();
    this.getBoard().forEach(row => {
      row.forEach(cell => {
        uniqueColorsOnBoard.add(cell.getColor());
      })
    })
    if(uniqueColorsOnBoard.size > 2) {
      this._isMatchCompleted = false;
    }
    else {
      this._isMatchCompleted = true;
    }
  }

  private getBoardSize() {
    return BOARD_SIZE;
  }

  private togglePlayerTurn() {
    ++this.activePlayerIndex;
    if(this.activePlayerIndex === this.getPlayers().length) {
      this.activePlayerIndex = 0;
    }
  }

  isMatchCompleted() {
    return this._isMatchCompleted;
  }

  getActivePlayerColor() {
    return this.getActivePlayer().getColor();
  }

  getBoard() {
    return this.board;
  }

}
