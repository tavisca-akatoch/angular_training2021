import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/productcomponent/app.product.view';
import { DataTableComponent } from './directives/componentdirective/app.datatable.component.directive';
import { ReactiveProductComponent } from './component/productreactiveformcomponent/app.reactiveproduct.view';
import { DropDownComponent } from './directives/componentdirective/app.dropdown.component.directive';
import { ColorDirective } from './directives/customattributedirective/app.color.directive';
import { ErrorColorDirective } from './directives/customattributedirective/app.errorcolor.directive';
import { DatatableElement } from './elements/app.datatable.element';
import { createCustomElement } from '@angular/elements';
import { ElementConsumerComponent } from './component/elementconsumer/app.elementconsumer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DataTableComponent,
    ReactiveProductComponent,
    DropDownComponent,
    ColorDirective,
    ErrorColorDirective,
    DatatableElement,
    ElementConsumerComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DatatableElement],
  providers: [],
  bootstrap: [ElementConsumerComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const datatableElement = createCustomElement(DatatableElement, {
      injector: this.injector,
    });

    customElements.define('datatable-element', datatableElement);
  }
}
