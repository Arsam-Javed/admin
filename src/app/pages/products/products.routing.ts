import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './components/addproducts/addproducts.component';
import { ListProductsComponent } from './components/listproducts/listproducts.component';
import {AuthGuard} from "../auth.guard";
import {EditProductsComponent} from "./components/editproducts/editproducts.component";
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: 'addproducts', component: AddProductsComponent, canActivate: [AuthGuard],
      data: { roles: ['sales'] }  },
      { path: 'editproduct/:id', component: EditProductsComponent, canActivate: [AuthGuard],
        data: { roles: ['sales'] }  },
      { path: 'listproducts/:id', component: ListProductsComponent, canActivate: [AuthGuard],
        data: { roles: ['sales'] }  },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
