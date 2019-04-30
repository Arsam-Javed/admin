import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal-products',
  styleUrls: [('./modal.component.scss')],
  templateUrl: './modal.component.html'
})

export class ModalProducts implements OnInit {

  modalHeader: string;
  modalContent: string = `Please fill all the fields.`;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }
}
