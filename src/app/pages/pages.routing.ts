import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule',
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
      { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
      { path: 'products', loadChildren: './products/products.module#ProductsModule' }
    ],
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'sales'] }
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
