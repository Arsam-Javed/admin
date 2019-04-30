import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../../../../services/search.service";
import {VendorActionService} from "../../../../services/venderactions.services";
import {ModalCategories} from "../modal/modal.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './listcategories.html',
  styleUrls: ['./listcategories.scss'],
})
export class ListCategoriesComponent {
  searched: string = '';
  categories: Array<any>;
  filteredcategories : Array<any>;
  constructor(private _venderActionService: VendorActionService,
              private router: Router,
              public _searchService: SearchService,
              public modalService: NgbModal) {
    _venderActionService.getAllCategories()
      .subscribe(res => {
        this.categories = res.categories;
        this.filteredcategories = this.categories;
      });
    this._searchService.search$.subscribe((data) => {
      this.searched = data;
      this.filteredcategories  = this.categories.filter(subs => {
        let keys = Object.keys(subs);
        for(let i=0; keys[i]!=null;i++)
        {
          if(subs[keys[i]] && subs[keys[i]] != null) {
            if (subs[keys[i]].toString().indexOf(this.searched) !== -1) {
              return true;
            }
          }
        }
        return false;
      });
      }

    );
  }
  deleteCategory(id: string, category: any){
    this._venderActionService.deleteCategory(id)
      .subscribe(res => {
        if(res.success) {
          const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Deleted Successfully!!';
          let index = this.categories.indexOf(category);
          this.categories.splice(index, 1);
          this.filteredcategories = this.categories;
        }
        else {
          const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = 'Something went wrong, Unable to delete!!';
        }
      });
  }
  activate(id: string, category: any) {
    this._venderActionService.activateCategory(id)
      .subscribe(res => {
        if(res.success) {
          const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Successfully Updated!!';
          let index = this.categories.indexOf(category);
          this.categories[index] = res.category;
          this.filteredcategories = this.categories;
        }
        else {
          const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = 'Something went wrong, Unable to update!!';
        }
      });
  }
  deactivate(id: string, category: any) {
    this._venderActionService.deactivateCategory(id)
      .subscribe(res => {
        if(res.success) {
          const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Successfully Updated!!';
          let index = this.categories.indexOf(category);
          this.categories[index] = res.category;
          this.filteredcategories = this.categories;
        }
        else {
          const activeModal = this.modalService.open(ModalCategories, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = 'Something went wrong, Unable to update!!';
        }
      });
  }
  editcategory(id: any){
    this.router.navigate(['/pages/categories/editcategories', id]);
  }
  listproducts(id: any){
    this.router.navigate(['/pages/products/listproducts', id]);
  }
}
