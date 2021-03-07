import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  templateUrl: 'app.datatable.element.html',
})
export class DatatableElement implements OnInit {
  private _Item: Array<any>;
  private _SortReverse: boolean;
  columnHeaders: Array<string>;

  @Output()
  selectHeader: EventEmitter<any>;

  @Output()
  sortReverse: EventEmitter<any>;

  constructor() {
    this._SortReverse = true;
    this._Item = new Array<any>();
    this.selectHeader = new EventEmitter<any>();
    this.columnHeaders = new Array<string>();
    this.sortReverse = new EventEmitter<any>();
  }

  ngOnInit() {}

  @Input()
  public set Items(item: Array<any>) {
    this._Item = item;
    this.columnHeaders = Object.keys(this._Item[0]);
  }

  public get Items(): Array<any> {
    return this._Item;
  }

  onSelectHeader(event: any): void {
    this._SortReverse = !this._SortReverse;
    console.log(event);
    console.log(this._SortReverse);
    this.sortReverse.emit(this._SortReverse);
    this.selectHeader.emit(event);
  }
}
