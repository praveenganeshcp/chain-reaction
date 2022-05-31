import { Injectable } from '@angular/core';
import { BOARD_SIZE, Cell } from '../models/cell';
import { CornerCell } from '../models/corner-cell';
import { EdgeCell } from '../models/edge-cell';
import { MiddleCell } from '../models/middle-cell';
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

  makeMove(xPos: number, yPos: number) {
    if(!this.isMatchCompleted()) {
      const cell = this.getCell(xPos, yPos);
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
      this.triggerChainReaction(xPos, yPos, cellFillColor);
      this.togglePlayerTurn();
    }
  }

  private getCell(xPos: number, yPos: number) {
    return this.getBoard()[xPos][yPos];
  }

  private triggerChainReaction(xPos: number, yPos: number, color: string) {
    const cell = this.getCell(xPos, yPos);
    cell.setColor(color);
    cell.incrementCount();
    if(cell.reachedThreshold()) {
      cell.makeEmpty();
      if(cell.isCorner()) {
        if(cell.isTopLeftCorner()) {
          this.triggerChainReaction(xPos+1, yPos, color);
          this.triggerChainReaction(xPos, yPos+1, color);
        }
        else if(cell.isTopRightCorner()) {
          this.triggerChainReaction(xPos, yPos-1, color);
          this.triggerChainReaction(xPos+1, yPos, color);
        }
        else if(cell.isBottomLeftCorner()) {
          this.triggerChainReaction(xPos-1, yPos, color);
          this.triggerChainReaction(xPos, yPos+1, color);
        }
        else if(cell.isBottomRightCorner()) {
          this.triggerChainReaction(xPos-1, yPos, color);
          this.triggerChainReaction(xPos, yPos-1, color);
        }
      }
      else if(cell.isEdge()) {
        if(cell.isTopEdge()) {
          this.triggerChainReaction(xPos, yPos-1, color);
          this.triggerChainReaction(xPos+1, yPos, color);
          this.triggerChainReaction(xPos, yPos+1, color);
        }
        else if(cell.isBottomEdge()) {
          this.triggerChainReaction(xPos, yPos-1, color);
          this.triggerChainReaction(xPos, yPos+1, color);
          this.triggerChainReaction(xPos-1, yPos, color);
        }
        else if(cell.isLeftEdge()) {
          this.triggerChainReaction(xPos-1, yPos, color);
          this.triggerChainReaction(xPos+1, yPos, color);
          this.triggerChainReaction(xPos, yPos+1, color);
        }
        else if(cell.isRightEdge()) {
          this.triggerChainReaction(xPos-1, yPos, color);
          this.triggerChainReaction(xPos+1, yPos, color);
          this.triggerChainReaction(xPos, yPos-1, color);
        }
      }
      else {
        this.triggerChainReaction(xPos-1, yPos, color);
        this.triggerChainReaction(xPos+1, yPos, color);
        this.triggerChainReaction(xPos, yPos-1, color);
        this.triggerChainReaction(xPos, yPos+1, color);
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
