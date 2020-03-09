import {
  Component,
  OnInit
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  BsModalRef
} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  title: String;
  message: String;
  isConfirm: boolean;
  isOkay: boolean;
  isClose: boolean;
  isCancel: boolean;

  constructor(
    private bsModalRef: BsModalRef,
    private translateService: TranslateService) {}

  ngOnInit(): void {}

  confirm() {
    this.close();
  }

  okay() {
    this.bsModalRef.hide();
  }

  close() {
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }

}
