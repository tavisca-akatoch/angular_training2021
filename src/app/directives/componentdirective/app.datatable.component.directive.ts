import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datatable-component',
  templateUrl: 'app.datatable.component.view.html'
})

export class DataTableComponent implements OnInit {
  private _DataSource: Array<any>;
  private _PageSize: Array<any>;
  private _TotalPage: number;
  columnHeaders: Array<string>;
  canDelete: boolean;
  sort: boolean;
  currentPageSize: number;
  currentPage: number;

  @Output()
  selectedRow: EventEmitter<any>;

  @Output()
  deleteRow: EventEmitter<any>;

  @Output()
  selectedHeader: EventEmitter<any>;

  @Output()
  sortReverse: EventEmitter<any>;

  @Output()
  selectedPageSize: EventEmitter<any>;

  @Output()
  selectedPage: EventEmitter<any>;

  constructor() {
    this._DataSource = new Array<any>();
    this._PageSize = new Array<any>();
    this.columnHeaders = new Array<string>();
    this.selectedRow = new EventEmitter<any>();
    this.deleteRow = new EventEmitter<any>();
    this.selectedHeader = new EventEmitter<any>();
    this.sortReverse = new EventEmitter<any>();
    this.selectedPageSize = new EventEmitter<any>();
    this.selectedPage = new EventEmitter<any>();
    this.canDelete = false;
    this.sort = true;
    this.currentPageSize = 5;
    this.currentPage = 1;
    this._TotalPage = 1;
  }

  ngOnInit() {
    this.columnHeaders = Object.keys(this._DataSource[0]);
  }

  @Input()
  public set DataSource(dataSource : Array<any>) {
    this._DataSource = dataSource;
  }


  public get DataSource() : Array<any> {
    return this._DataSource;
  }

  @Input()
  public set PageSize(pageSize : Array<any>) {
    this._PageSize = pageSize;
    this.currentPageSize = pageSize[0];
  }

  public get PageSize() : Array<any> {
    return this._PageSize;
  }

  @Input()
  public set TotalPage(totalPage : number) {
    this._TotalPage = totalPage;
  }

  public get TotalPage() : number {
    return this._TotalPage;
  }


  onSelectRow(row : any) : void {
    this.selectedRow.emit(row);
  }

  delete(row : any) : void {
    this.deleteRow.emit(row);
  }

  onSelectHeader(header : any) : void {
    this.sortReverse.emit(this.sort);
    this.selectedHeader.emit(header);
  }

  onPageSizeSelect(size : any) : void {
    this.currentPageSize = size;
    this.currentPage = 1;
    this.selectedPageSize.emit(size);
  }

  onSort(event : any) : void {
    if(event.target.value === 'sort') {
      this.sort = true;
    }
    else {
      this.sort = false;
    }
  }

  onPageSelect(pageNumber: any) : void {
    if(pageNumber > 0 && pageNumber <= this._TotalPage) {
      this.currentPage = pageNumber;
      this.selectedPage.emit(pageNumber);
    }
  }
}
