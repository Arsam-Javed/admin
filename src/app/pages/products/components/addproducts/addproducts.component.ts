import { Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef } from '@angular/core';
import {PackagesServices} from "../../../../services/packages.services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {AuthGuard} from "../../../auth.guard";
import {VenderService} from "../../../../services/vender.services";
import {VendorActionService} from "../../../../services/venderactions.services";
import {ModalProducts} from "../modal/modal.component";


@Component({
  selector: 'nga-add-products',
  templateUrl: './addproducts.html',
  styleUrls: ['./addproducts.scss'],
})

export class AddProductsComponent {
  sendingRequest: boolean = false;
  submitted: boolean = false;
  file: File;
  value: string = '';
  data: {} = {};
  categories: Array<any> = [];
  drytypes: Array<any>;
  constructor(private _cfr: ComponentFactoryResolver,
              private _package: PackagesServices,
              public modalService: NgbModal,
              private router: Router,
              public _authService: AuthGuard,
              public _vendorService: VenderService,
              public _vendorActionService: VendorActionService) {
    this.drytypes = [ {type: 'Yes', dry: 1}, {type: 'No', dry: 0} ];
    this.data['type'] = 'No';
    this.data['dry'] = 0;
    this._vendorActionService.getAllCategories()
      .subscribe(res => {
      if (res.success) {
        this.categories = res.categories;
      }
    });
  }

  add(){
    this.submitted = true;
    if(this.data['title'] != '' && this.data['image'] != '' && this.data['category_id'] != '' && this.data['price'] != '') {
          this._vendorActionService.addproducts(this.file,this.data)
            .then(res => {
            this.sendingRequest = false;
            this.router.navigate(['/pages/products/listproducts', this.data['category_id']]);
            const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
            activeModal.componentInstance.modalHeader = 'Success';
            activeModal.componentInstance.modalContent = 'Product has been added successfully!';
          })
        }
        else {
      const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
      activeModal.componentInstance.modalHeader = 'Error';
      activeModal.componentInstance.modalContent = 'Please fill all the fields!!';
    }
  }
}
