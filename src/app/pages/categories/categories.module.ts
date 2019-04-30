import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './categories.routing';
import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './components/addcategory/addcategory.component';
import { ListCategoriesComponent } from './components/listcategories/listcategories.component';
import { EditCategoriesComponent } from './components/editcategories/editcategories.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { BasicTablesService } from '../tables/components/basicTables/basicTables.service';
import {PackagesServices} from "../../services/packages.services";
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


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
    CategoriesComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    EditCategoriesComponent
   ],
  providers: [
    BasicTablesService,
    PackagesServices
],
})
export class CategoriesModule {
}
