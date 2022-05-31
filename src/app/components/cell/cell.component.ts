import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell } from 'src/app/models/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell: Cell;
  @Output() makeMove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.cell);
  }

  getColorArray() {
    return new Array(this.cell.getCount());
  }

}
