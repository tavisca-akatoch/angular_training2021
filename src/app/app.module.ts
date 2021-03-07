import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/productcomponent/app.product.view';
import { DataTableComponent } from './directives/componentdirective/app.datatable.component.directive';
import { ReactiveProductComponent } from './component/productreactiveformcomponent/app.reactiveproduct.view';
import { DropDownComponent } from './directives/componentdirective/app.dropdown.component.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DataTableComponent,
    ReactiveProductComponent,
    DropDownComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [ReactiveProductComponent],
})
export class AppModule {}
