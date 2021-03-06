import { ProductInfo } from './app.productinfo.model'

export class Logic {
  private products: Array<ProductInfo>;

  constructor() {
    this.products = new Array<ProductInfo>();

    this.products.push(
      new ProductInfo(1, 'Prd-001', 'Laptop', 'Electronics', 'HP', 'Gaming', 120000)
    );
    this.products.push(
      new ProductInfo(2, 'Prd-002', 'Iron', 'Electrical', 'Bajaj', 'Power Press', 2000)
    );
    this.products.push(
      new ProductInfo(3, 'Prd-003', 'Lays', 'Food', 'TATA', 'Energy Food', 20)
    );
  }

  getProducts(): Array<ProductInfo> {
    return this.products;
  }

  addProduct(product: ProductInfo) : Array<ProductInfo> {
    this.products.push(product);
    return this.products;
  }

  deleteProduct(event : any) : Array<ProductInfo> {
    let index = this.products.indexOf(event);
    this.products.splice(index, 1);
    return this.products;
  }

  sort(header : any, sort : boolean) : Array<ProductInfo>{
    this.products.sort((a, b) => {
      if(a[header] === b[header]) {
        return 0;
      }
      return (a[header] < b[header] ? -1 : 1) * (sort ? 1 : -1);
    });
    return this.products;
  }

  applyPagination(page : number, pageSize : number) : Array<ProductInfo> {
    return this.products.slice((page - 1) * pageSize, (page) * pageSize);
  }
}
