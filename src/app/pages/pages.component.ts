import {Component, OnInit} from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import {AuthGuard} from './auth.guard';
import {isDefined} from '@ngx-translate/core/src/util';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://facebook.com/arsam" translate>Arsam</a> 2018</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `,
})
export class Pages implements OnInit{

  constructor(private _menuService: BaMenuService,
              private authGurad: AuthGuard) {
  }

  ngOnInit() {
    let role = this.authGurad.role();
    let pages = [{path: 'pages', children: []}];
    let page = {};
    PAGES_MENU[0].children.forEach(child => {
      page = {};
      if(child['data'].roles.indexOf(role) != -1)
      {
        page = {
          path: child['path'],
          data: child['data'],
          children: []
        };
        if(isDefined(child['children'])){
          child['children'].forEach(morechild => {
            if(morechild['data'].roles.indexOf(role) != -1){
              page['children'].push(morechild);
            }
            }
          )
        }
      }
      if(JSON.stringify(page) != '{}') {
        pages[0].children.push(page);
      }
    });
    this._menuService.updateMenuByRoutes(<Routes>pages);
  }
}
