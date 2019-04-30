import { Component } from '@angular/core';
import {PackagesServices} from "../../../../services/packages.services";
import {ActivatedRoute, Router} from "@angular/router";
import {isDefined} from "@ngx-translate/core/src/util";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalCategories} from "../modal/modal.component";
import {VendorActionService} from "../../../../services/venderactions.services";

@Component({
  selector: 'nga-edit-categories',
  templateUrl: './editcategories.html',
  styleUrls: ['./editcategories.scss'],
})
export class EditCategoriesComponent {
  sendingRequest : boolean = false;
  submitted: boolean = false;
  file: File;
  data: {} = {};
  loading: boolean = true;
  constructor(private _packageService: PackagesServices,
              private route: ActivatedRoute,
              public modalService: NgbModal,
              public router: Router,
              public _vendorActionService: VendorActionService) {
    console.log("in Edit");
    let sub = this.route.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number
      console.log(id);
      this._vendorActionService.getCategory(id)
        .subscribe(res=> {
            console.log(res);
            this.data = res.category[0];
            this.loading = false;
            console.log(this.data);
          }
        );
      // In a real app: dispatch action to load the details here.
    })}
    fileChangeEvent(event: any) {
      this.file = <File> event.target.files;
  }
  save(){
    this.submitted = true;
    // console.log(this.data);
    if(this.data['title'] != '' && this.data['icon'] != '') {
      this._vendorActionService.editcategory(this.file,this.data)
        .then(res => {
          console.log(res);
          if(res['success']) {
            this.sendingRequest = false;
            this.router.navigate(['/pages/categories/allcategories']);
            const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
            activeModal.componentInstance.modalHeader = 'Success';
            activeModal.componentInstance.modalContent = 'Category has been updated!';
          }
          else {
            const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
            activeModal.componentInstance.modalHeader = 'Error';
            activeModal.componentInstance.modalContent = 'Something went wrong, Unable to update!';
          }
        })
    }
    else {
      console.log("in else");
      const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
      activeModal.componentInstance.modalHeader = 'Error';
      activeModal.componentInstance.modalContent = 'Please fill all the fields!!';
    }
  }
}
