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
import {ModalCategories} from "../modal/modal.component";
import {isDefined} from "@ngx-translate/core/src/util";

@Component({
  selector: 'nga-add-category',
  templateUrl: './addcategory.html',
  styleUrls: ['./addcategory.scss'],
})

export class AddCategoryComponent {
  sendingRequest : boolean = false;
  submitted: boolean = false;
  file: File;
  data: {} = {};
  constructor(private _cfr: ComponentFactoryResolver,
              private _package: PackagesServices,
              public modalService: NgbModal,
              private router: Router,
              public _authService: AuthGuard,
              public _vendorService: VenderService,
              public _vendorActionService: VendorActionService) {
  }
   fileChangeEvent(event: any) {
    this.file = <File> event.target.files;
   }

  add(){
    this.submitted = true;
    if(this.data['title'] != '' && isDefined(this.file)) {
          this._vendorActionService.addcategory(this.file,this.data)
            .then(res => {
            this.sendingRequest = false;
            this.router.navigate(['pages/categories/listCategories']);
            const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
            activeModal.componentInstance.modalHeader = 'Success';
            activeModal.componentInstance.modalContent = 'Category has been added!';
          })
        }
        else {
      const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
      activeModal.componentInstance.modalHeader = 'Error';
      activeModal.componentInstance.modalContent = 'Please fill all the fields!!';
    }
  }
}
