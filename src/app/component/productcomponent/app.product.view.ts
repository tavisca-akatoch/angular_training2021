import { Component, OnInit } from '@angular/core';
import { Logic } from 'src/app/models/app.productinfo.logic';
import { ProductInfo } from 'src/app/models/app.productinfo.model';
import { Categories, Manufacturers, PageSize } from "./../../models/app.constant";

@Component({
  selector: 'app-product-component',
  templateUrl: 'app.product.view.html'
})

export class ProductComponent implements OnInit {
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

  constructor() {
    this.logic = new Logic();
    this.product = new ProductInfo(0,'','','','','',0);
    this.products = new Array<ProductInfo>();
    this.sort = true;
    this.currentPage = 1;
    this.totalPage = 1;
    this.selectedPageSize = 5;
  }

  ngOnInit() {
    this.products = this.logic.getProducts();
    this.totalPage = Math.ceil(this.products.length / this.selectedPageSize);
  }

  clear() : void {
    this.product = new ProductInfo(0,'','','','','',0);
  }

  save() : void {
    this.products = this.logic.addProduct(this.product);
    this.totalPage = Math.ceil(this.products.length / this.selectedPageSize);
    this.products = this.logic.applyPagination(this.currentPage, this.selectedPageSize);
  }

  onSelectedProduct(event: any) : void {
    this.product = Object.assign({}, event);
  }

  onDeleteProduct(event : any) : void {
    this.products = this.logic.deleteProduct(event);
    this.totalPage = Math.ceil(this.products.length / this.selectedPageSize);
    this.products = this.logic.applyPagination(this.currentPage, this.selectedPageSize);
  }

  onSelectedHeader(event : any) : void {
    this.products = this.logic.sort(event, this.sort);
  }

  onSortOrReverse(event : any) : void {
    this.sort = event;
  }

  onPageSizeSelect(event : any) : void {
    this.selectedPageSize = event;
    this.currentPage = 1;
    this.totalPage = Math.ceil(this.logic.getProducts().length / this.selectedPageSize);
    this.products = this.logic.applyPagination(this.currentPage, event);
  }

  onPageSelect(event : any) : void {
    this.currentPage = event;
    this.products = this.logic.applyPagination(event, this.selectedPageSize);
  }
}
