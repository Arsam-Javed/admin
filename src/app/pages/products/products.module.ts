import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './products.routing';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './components/addproducts/addproducts.component';
import { ListProductsComponent } from './components/listproducts/listproducts.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { BasicTablesService } from '../tables/components/basicTables/basicTables.service';
import {PackagesServices} from "../../services/packages.services";
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {VendorActionService} from "../../services/venderactions.services";
import {EditProductsComponent} from "./components/editproducts/editproducts.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    NgbDropdownModule,
    NgbModalModule,
    HttpModule
  ],
  declarations: [
    EditProductsComponent,
    ProductsComponent,
    AddProductsComponent,
    ListProductsComponent
   ],
  providers: [
    BasicTablesService,
    PackagesServices,
    VendorActionService
],
})
export class ProductsModule {
}
