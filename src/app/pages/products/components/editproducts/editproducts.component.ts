import { Component } from '@angular/core';
import {PackagesServices} from "../../../../services/packages.services";
import {ActivatedRoute, Router} from "@angular/router";
import {isDefined} from "@ngx-translate/core/src/util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalProducts} from "../modal/modal.component";
import {VendorActionService} from "../../../../services/venderactions.services";

@Component({
  selector: 'nga-edit-products',
  templateUrl: './editproducts.html',
  styleUrls: ['./editproducts.scss'],
})
export class EditProductsComponent {
  sendingRequest : boolean = false;
  submitted: boolean = false;
  file: File;
  data: {} = {};
  loaded: boolean = false;
  categories: Array<any> = [];
  drytypes : Array<any>;
  constructor(private _packageService: PackagesServices,
              private route: ActivatedRoute,
              public modalService: NgbModal,
              public router: Router,
              public _vendorActionService: VendorActionService) {
    console.log("in Edit");
    this.drytypes = [ {type: 'Yes', dry: 1}, {type: 'No', dry: 0} ];
    let sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this._vendorActionService.getproduct(id)
        .subscribe(res=> {
            this.loaded = true;
            this.data = res.product;
            if(this.data['dry'] == 1)
            {
              this.data['type'] = 'Yes';
              this.data['dry'] = 1;
            }
            else
            {
              this.data['type'] = 'No';
              this.data['dry'] = 0;
            }
          this._vendorActionService.getAllCategories()
            .subscribe(res => {
            if (res.success) {
              this.categories = res.categories;
              for(let i=0; this.categories[i]; i++)
              {
                if(this.categories[i]['_id'] == this.data['category_id'])
                {
                  this.data['category'] = this.categories[i]['title'];
                }
              }
            }
          });
          }
        );
    })}
  save(){
    this.submitted = true;
    if(this.data['title'] != '' && this.data['category_id'] != '' && this.data['price'] != '') {
      this._vendorActionService.editproduct(this.file,this.data)
        .then(res => {
          if(res['success']) {
            this.sendingRequest = false;
            this.router.navigate(['/pages/products/listproducts', this.data['category_id']]);
            const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
            activeModal.componentInstance.modalHeader = 'Success';
            activeModal.componentInstance.modalContent = 'Product has been updated!';
          }
          else {
            const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
            activeModal.componentInstance.modalHeader = 'Error';
            activeModal.componentInstance.modalContent = 'Something went wrong, Unable to update!';
          }
        })
    }
    else {
      const activeModal = this.modalService.open(ModalProducts, {size: 'sm'});
      activeModal.componentInstance.modalHeader = 'Error';
      activeModal.componentInstance.modalContent = 'Please fill all the fields!!';
    }
  }
}
