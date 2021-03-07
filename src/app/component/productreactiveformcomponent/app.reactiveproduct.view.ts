import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logic } from 'src/app/models/app.productinfo.logic';
import { ProductInfo } from 'src/app/models/app.productinfo.model';
import {
  Categories,
  Manufacturers,
  PageSize,
} from './../../models/app.constant';
import { CustomValidator } from './app.custom.validator';

@Component({
  selector: 'app-reactiveproduct-component',
  templateUrl: 'app.reactiveproduct.view.html',
})
export class ReactiveProductComponent implements OnInit {
  product: ProductInfo;
  products: Array<ProductInfo>;
  logic: Logic;
  categories = Categories;
  manufacturers = Manufacturers;
  pageSize = PageSize;
  sort: boolean;
  currentPage: number;
  selectedPageSize: number;
  totalPage: number;
  formGroup: FormGroup;
  formSubmitted: boolean;

  constructor() {
    this.logic = new Logic();
    this.product = new ProductInfo(0, '', '', '', '', '', 0);
    this.products = new Array<ProductInfo>();
    this.sort = true;
    this.formSubmitted = false;
    this.currentPage = 1;
    this.totalPage = 1;
    this.selectedPageSize = 5;

    this.formGroup = new FormGroup({
      ProductRowId: new FormControl(
        this.product.ProductRowId,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(8),
          Validators.min(1),
          Validators.pattern('[0-9]+'),
          CustomValidator.checkEven, // custom validator
        ])
      ),
      ProductId: new FormControl(
        this.product.ProductId,
        Validators.compose([
          Validators.required,
          Validators.pattern('^Prd-[0-9]+$'),
          CustomValidator.unique(this.logic),
        ])
      ),
      ProductName: new FormControl(
        this.product.ProductName,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Z][A-Za-z0-9]*'),
        ])
      ),
      CategoryName: new FormControl(this.product.CategoryName),
      Manufacturer: new FormControl(this.product.Manufacturer),
      Description: new FormControl(this.product.Description),
      BasePrice: new FormControl(
        this.product.BasePrice,
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.min(1),
        ])
      ),
    });
  }

  ngOnInit() {
    this.products = this.logic.getProducts();
    this.totalPage = Math.ceil(this.products.length / this.selectedPageSize);
  }

  clear(): void {
    this.onSelectedProduct(new ProductInfo(0, '', '', '', '', '', 0));
  }

  save(): void {
    this.formSubmitted = true;
    if (this.formGroup.valid) {
      this.formSubmitted = false;
      this.products = this.logic.addProduct(this.formGroup.value);
      this.totalPage = Math.ceil(this.products.length / this.selectedPageSize);
      this.products = this.logic.applyPagination(
        this.currentPage,
        this.selectedPageSize
      );
    }
  }

  onSelectedProduct(event: any): void {
    this.formGroup.setValue(event);
  }

  onDeleteProduct(event: any): void {
    this.products = this.logic.deleteProduct(event);
    this.totalPage = Math.ceil(this.products.length / this.selectedPageSize);
    this.products = this.logic.applyPagination(
      this.currentPage,
      this.selectedPageSize
    );
  }

  onSelectedHeader(event: any): void {
    this.products = this.logic.sort(event, this.sort);
    this.products = this.logic.applyPagination(
      this.currentPage,
      this.selectedPageSize
    );
  }

  onSortOrReverse(event: any): void {
    this.sort = event;
  }

  onPageSizeSelect(event: any): void {
    this.selectedPageSize = event;
    this.currentPage = 1;
    this.totalPage = Math.ceil(
      this.logic.getProducts().length / this.selectedPageSize
    );
    this.products = this.logic.applyPagination(this.currentPage, event);
  }

  onPageSelect(event: any): void {
    this.currentPage = event;
    this.products = this.logic.applyPagination(event, this.selectedPageSize);
  }
}
