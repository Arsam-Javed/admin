import { Component } from '@angular/core';

import {PackagesServices} from "../../../../services/packages.services";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../../services/search.service";
import {VendorActionService} from "../../../../services/venderactions.services";
import {ModalProducts} from "../modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  templateUrl: './listproducts.html',
  styleUrls: ['./listproducts.scss'],
})
export class ListProductsComponent {
  searched: string = '';
  products: Array<any>;
  filteredproducts : Array<any>;
  constructor(private _venderActionService: VendorActionService,
              private router: Router,
              public _searchService: SearchService,
              public modalService: NgbModal,
              private route: ActivatedRoute) {
    let sub = this.route.params.subscribe(params => {
      let category_id = params['id'];
      this._venderActionService.getAllProducts(category_id)
        .subscribe(res=> {
          this.products = res.products;
          this.filteredproducts = this.products;
          }
        );
    });
    this._searchService.search$.subscribe((data) => {
      this.searched = data;
      this.filteredproducts  = this.products.filter(subs => {
        let keys = Object.keys(subs);
        for(let i=0; keys[i]!=null;i++)
        {
          if(subs[keys[i]].toString().indexOf(this.searched) !== -1)
          {
            return true;
          }
        }
        return false;
      });
      }

    );
  }
  activate(id: string, category: any) {
    this._venderActionService.activateProduct(id)
      .subscribe(res => {
        if(res.success) {
          const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Successfully Updated!!';
          let index = this.products.indexOf(category);
          this.products[index] = res.product;
          this.filteredproducts = this.products;
        }
        else {
          const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = 'Something went wrong, Unable to update!!';
        }
      });
  }
  deactivate(id: string, category: any) {
    this._venderActionService.deactivateProduct(id)
      .subscribe(res => {
        if(res.success) {
          const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Successfully Updated!!';
          let index = this.products.indexOf(category);
          this.products[index] = res.product;
          this.filteredproducts = this.products;
        }
        else {
          const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = 'Something went wrong, Unable to update!!';
        }
      });
  }
  deleteproduct(id: string, product: any){
    this._venderActionService.deleteproduct(id)
      .subscribe(res => {
        if(res.success) {
          const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Deleted Successfully!!';
          let index = this.products.indexOf(product);
          this.products.splice(index, 1);
          this.filteredproducts = this.products;
        }
        else {
          const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = 'Something went wrong, Unable to delete!!';
        }
      });
  }
}
