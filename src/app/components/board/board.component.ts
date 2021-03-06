import { Component, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
  }

  makeMove(xPos: number, yPos: number) {
    console.log(xPos, yPos);
    this.boardService.makeMove(new Move(xPos, yPos));
  }

}
