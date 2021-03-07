import { stringify } from '@angular/compiler/src/util';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Logic } from 'src/app/models/app.productinfo.logic';

export class CustomValidator {
  static checkEven(control: AbstractControl): any {
    if (control.value === '') {
      return null;
    }
    let value = parseInt(control.value);
    if (value === 0 || value % 2 === 0) {
      return null; // valid
    } else {
      return { even: false };
    }
  }

  static unique(logic: Logic): ValidatorFn {
    return (control: AbstractControl): any => {
      let value = control.value;
      if (logic.getProducts().find((x) => x.ProductId === value)) {
        return { unique: false };
      } else {
        return null; //valid
      }
    };
  }
}
