import {Component} from '@angular/core';
import {VendorActionService} from "../../services/venderactions.services";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MissingFieldsModal} from '../packages/components/addpackage/missing-fields-modal/missing-fields-modal.component';
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  sendingRequest : boolean = false;
  percentage: number = 0;
  public checkboxModel = [{
    name: 'Monday',
    checked: true
  }, {
    name: 'Tuesday',
    checked: true
  }, {
    name: 'Wednesday',
    checked: true
  },{
    name: 'Thursday',
    checked: true
  }, {
    name: 'Friday',
    checked: true
  }, {
    name: 'Saturday',
    checked: true
  }, {
    name: 'Sunday',
    checked: true
  }];
  constructor(
    public venderActionService: VendorActionService,
    public modalService: NgbModal,) {
    this.venderActionService.getSpecialPickupPercentage()
      .subscribe(res=>{
        if(res.success)
        {
          this.percentage = res.percent;
        }
      });
    this.venderActionService.getOffdays()
      .subscribe(res=>{
        if(res.success)
        {
          let offDays = res.offdays.offdays;
          for (let i=0;i<offDays.length ;i++)
          {
            this.checkboxModel[offDays[i]].checked = false;
          }
        }
      })

  }
  public checkboxPropertiesMapping = {
    model: 'checked',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };
  updatedays(){
    let offdays = [];
    for (let i=0;i<this.checkboxModel.length ;i++)
    {
      if(!this.checkboxModel[i].checked)
      {
        offdays.push(i);
      }
    }
    let body = {offdays: offdays};
    this.venderActionService.setOffdays(body)
      .subscribe(res=>{
        if(res.success) {
          const activeModal = this.modalService.open(MissingFieldsModal, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Successfully Updated!';
        }
        else {
          const activeModal = this.modalService.open(MissingFieldsModal, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = res.message;
        }
      });
  }
  updatepercentage(){
    let body = {
      percentage: this.percentage
    };
    this.venderActionService.setSpecialPickupPercentage(body)
      .subscribe(res=>{
        if(res.success) {
          const activeModal = this.modalService.open(MissingFieldsModal, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Success';
          activeModal.componentInstance.modalContent = 'Successfully Updated!';
        }
        else {
          const activeModal = this.modalService.open(MissingFieldsModal, {size: 'sm'});
          activeModal.componentInstance.modalHeader = 'Error';
          activeModal.componentInstance.modalContent = res.message;
        }
      });
  }
}
