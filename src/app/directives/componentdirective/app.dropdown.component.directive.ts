import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-component',
  templateUrl: 'app.dropdown.component.view.html',
})
export class DropDownComponent implements OnInit {
  private _DropDown: Array<any>;
  private _DropDownName: string;
  private _FormGroup: FormGroup;

  constructor() {
    this._DropDown = new Array<any>();
    this._DropDownName = '';
    this._FormGroup = new FormGroup({
      control: new FormControl(),
    });
  }

  ngOnInit() {}

  @Input()
  public set DropDown(value: Array<any>) {
    this._DropDown = value;
  }

  public get DropDown(): Array<any> {
    return this._DropDown;
  }

  @Input()
  public set DropDownName(value: string) {
    this._DropDownName = value;
  }

  public get DropDownName(): string {
    return this._DropDownName;
  }

  @Input()
  public set FormGroup(value: FormGroup) {
    this._FormGroup = value;
  }

  public get FormGroup(): FormGroup {
    return this._FormGroup;
  }
}
