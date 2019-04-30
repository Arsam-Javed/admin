import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './components/addcategory/addcategory.component';
import { ListCategoriesComponent } from './components/listcategories/listcategories.component';
import { EditCategoriesComponent } from './components/editcategories/editcategories.component';
import {AuthGuard} from "../auth.guard";
const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      { path: 'addcategory', component: AddCategoryComponent, canActivate: [AuthGuard],
      data: { roles: ['sales'] }  },
      { path: 'allcategories', component: ListCategoriesComponent, canActivate: [AuthGuard],
        data: { roles: ['sales'] } },
      { path: 'editcategories/:id', component: EditCategoriesComponent, canActivate: [AuthGuard],
        data: { roles: ['sales'] } },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
